import os
import json
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build

from fastapi.middleware.cors import CORSMiddleware
import os

OAUTH_STATE = {}

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://autoserviceiq.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SCOPES = ["https://www.googleapis.com/auth/calendar.events"]
TOKEN_FILE = "google_token.json"


class BookingRequest(BaseModel):
    name: str
    email: str
    vehicle: str
    zipcode: str
    service: str
    date: str


def client_config():
    return {
        "web": {
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": [os.getenv("GOOGLE_REDIRECT_URI")],
        }
    }


@app.get("/")
def root():
    return {"message": "South Bay Mechanic backend is running"}


@app.get("/auth/google")
def auth_google():
    flow = Flow.from_client_config(
        client_config(),
        scopes=SCOPES,
        redirect_uri=os.getenv("GOOGLE_REDIRECT_URI"),
        autogenerate_code_verifier=True,
    )

    auth_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="false",
        prompt="consent",
    )

    OAUTH_STATE[state] = flow.code_verifier

    return RedirectResponse(auth_url)


@app.get("/auth/google/callback")
def auth_google_callback(code: str, state: str):
    code_verifier = OAUTH_STATE.pop(state, None)

    flow = Flow.from_client_config(
        client_config(),
        scopes=SCOPES,
        redirect_uri=os.getenv("GOOGLE_REDIRECT_URI"),
        state=state,
        code_verifier=code_verifier,
    )

    flow.fetch_token(code=code)

    with open(TOKEN_FILE, "w") as f:
        f.write(flow.credentials.to_json())

    return RedirectResponse("http://localhost:3000?calendar=connected")


def calendar_service():
    if not os.path.exists(TOKEN_FILE):
        raise RuntimeError("Google Calendar is not connected.")

    creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    return build("calendar", "v3", credentials=creds)


@app.get("/calendar/status")
def calendar_status():
    return {"connected": os.path.exists(TOKEN_FILE)}


@app.post("/book-service")
def book_service(request: BookingRequest):
    service = calendar_service()

    start_dt = datetime.fromisoformat(request.date)
    end_dt = start_dt + timedelta(hours=2)

    event = {
        "summary": f"{request.service} - {request.vehicle}",
        "description": (
            f"Customer: {request.name}\n"
            f"Email: {request.email}\n"
            f"Vehicle: {request.vehicle}\n"
            f"Zip: {request.zipcode}\n"
            f"Service: {request.service}"
        ),
        "location": request.zipcode,
        "start": {
            "dateTime": start_dt.isoformat(),
            "timeZone": "America/Los_Angeles",
        },
        "end": {
            "dateTime": end_dt.isoformat(),
            "timeZone": "America/Los_Angeles",
        },
    }

    created_event = service.events().insert(
        calendarId="primary",
        body=event
    ).execute()

    return {
        "success": True,
        "message": "Booking added to Google Calendar",
        "eventLink": created_event.get("htmlLink"),
    }