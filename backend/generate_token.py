from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/calendar.events"]

flow = InstalledAppFlow.from_client_secrets_file(
    "client_secret.json",
    scopes=SCOPES
)

creds = flow.run_local_server(port=8080, prompt="consent")

with open("google_token.json", "w") as f:
    f.write(creds.to_json())

print("Saved google_token.json")
