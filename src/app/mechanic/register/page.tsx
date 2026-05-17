"use client";

import { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export default function MechanicRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [mechanicId, setMechanicId] = useState("");
  const [message, setMessage] = useState("");

  async function registerMechanic() {
    const response = await fetch(`${API_BASE}/mechanics/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        service_area: serviceArea,
        services: ["Oil Change", "Brake Replacement", "Battery Diagnostic"],
      }),
    });

    const data = await response.json();

    setMechanicId(data.mechanic_id);
    setMessage(data.message);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-blue-700">
          Register as a Mechanic
        </h1>

        <p className="text-gray-700 mt-3">
          Create your mechanic profile and connect your Google Calendar.
        </p>

        <div className="grid grid-cols-1 gap-5 mt-8">
          <input
            className="border border-gray-300 rounded-xl p-4 text-gray-900 bg-white"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border border-gray-300 rounded-xl p-4 text-gray-900 bg-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border border-gray-300 rounded-xl p-4 text-gray-900 bg-white"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="border border-gray-300 rounded-xl p-4 text-gray-900 bg-white"
            placeholder="Service Area, e.g. South Bay"
            value={serviceArea}
            onChange={(e) => setServiceArea(e.target.value)}
          />

          <button
            onClick={registerMechanic}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
          >
            Register Mechanic
          </button>

          {message && (
            <div className="bg-green-100 text-green-800 p-4 rounded-xl">
              {message}
            </div>
          )}

          {mechanicId && (
            <a
              href={`${API_BASE}/mechanics/${mechanicId}/connect-google`}
              className="text-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold"
            >
              Connect Google Calendar
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
