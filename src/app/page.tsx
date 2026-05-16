"use client";

import { useState } from "react";

export default function Home() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [service, setService] = useState("Oil Change");

  const [responseMsg, setResponseMsg] = useState("");
  const [date, setDate] = useState("");

  async function handleBooking() {

    const response = await fetch("http://localhost:8000/book-service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        vehicle,
        zipcode,
        service,
        date,
      }),
    });

    const data = await response.json();

    setResponseMsg(data.message);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-white rounded-2xl shadow p-6">

          <h1 className="text-4xl font-bold text-blue-700">
            🔧 South Bay Mobile Mechanic
          </h1>

          <p className="text-gray-600 mt-2">
            Professional repair at your driveway.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Book Your Maintenance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              className="border rounded-lg p-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="border rounded-lg p-3 md:col-span-2"
              placeholder="Vehicle Year/Make/Model"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Zip Code"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />

            <select
              className="border rounded-lg p-3"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option>Oil Change</option>
              <option>Brake Replacement</option>
              <option>Battery Diagnostic</option>
              <option>General Inspection</option>
            </select>
            
            <input
              type="datetime-local"
              className="border rounded-lg p-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button
            onClick={handleBooking}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Check Availability
          </button>

          {responseMsg && (
            <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-lg">
              {responseMsg}
            </div>
          )}

        </div>

      </div>

    </main>
  );
}
