"use client";

import { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [service, setService] = useState("Oil Change");
  const [responseMsg, setResponseMsg] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleBooking() {
    setResponseMsg("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/book-service`, {
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

      if (!response.ok) {
        throw new Error(data.detail || "Booking failed.");
      }

      setResponseMsg(data.message || "Booking submitted successfully.");
    } catch (error) {
      setResponseMsg(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  //const inputClass =
  // "border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  
  const inputClass =
  "w-full border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-500 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    //<main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-8">
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          //<h1 className="text-5xl font-bold text-blue-700">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
            Auto Service IQ
          </h1>

          <p className="text-gray-700 text-xl mt-3">
            AI-powered vehicle service booking platform.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Book Your Maintenance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              className={inputClass}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className={inputClass}
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className={`${inputClass} md:col-span-2`}
              placeholder="Vehicle Year/Make/Model"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            />

            <input
              className={inputClass}
              placeholder="Zip Code"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />

            <select
              className={inputClass}
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
              className={`${inputClass} text-gray-900 bg-white [color-scheme:light]`}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button
            onClick={handleBooking}
            disabled={isSubmitting}
            className="mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-4 rounded-xl font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Check Availability"}
          </button>

          {responseMsg && (
            <div className="mt-5 bg-green-100 text-green-800 p-4 rounded-xl font-medium">
              {responseMsg}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}