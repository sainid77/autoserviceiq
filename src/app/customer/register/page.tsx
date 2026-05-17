"use client";

import { useState } from "react";

export default function CustomerRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [message, setMessage] = useState("");

  async function registerCustomer() {
    const response = await fetch(
      "https://autoserviceiq.onrender.com/customers/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          zipcode,
          vehicle,
        }),
      }
    );

    const data = await response.json();

    setMessage(data.message);
  }

  return (
    <main className="min-h-screen p-8 bg-slate-100">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl space-y-4">

        <h1 className="text-4xl font-bold">
          Customer Registration
        </h1>

        <input
          className="w-full border p-4 rounded-xl"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-4 rounded-xl"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-4 rounded-xl"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="w-full border p-4 rounded-xl"
          placeholder="Zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />

        <input
          className="w-full border p-4 rounded-xl"
          placeholder="Vehicle"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />

        <button
          onClick={registerCustomer}
          className="bg-blue-600 text-black px-8 py-4 rounded-xl"
        >
          Register Customer
        </button>

        {message && (
          <div className="bg-green-100 p-4 rounded-xl text-green-800">
            {message}
          </div>
        )}

      </div>
    </main>
  );
}