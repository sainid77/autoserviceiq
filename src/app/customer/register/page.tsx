"use client";

import { useState } from "react";

export default function CustomerRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  async function registerCustomer() {
    try {
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

      setMessage(data.message || "Customer registered successfully.");
    } catch (error) {
      setMessage("Registration failed.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 space-y-6">

        <h1 className="text-5xl font-bold text-gray-900">
          Customer Registration
        </h1>

        <input
          className={inputClass}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={inputClass}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={inputClass}
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className={inputClass}
          placeholder="Zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />

        <input
          className={inputClass}
          placeholder="Vehicle"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />

        <button
          onClick={registerCustomer}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
        >
          Register Customer
        </button>

        {message && (
          <div className="bg-green-100 text-green-800 p-4 rounded-xl">
            {message}
          </div>
        )}

      </div>
    </main>
  );
}