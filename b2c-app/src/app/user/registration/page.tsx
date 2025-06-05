"use client";

import { useState } from "react";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else {
        setSuccess("Registration successful! You can now log in.");
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen w-full px-100 py-20 bg-(--background) text-(--foreground)"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <label className="block mb-2">
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 p-2 border rounded-full"
        />
      </label>

      <label className="block mb-2">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-2 border rounded-full"
        />
      </label>

      <label className="block mb-4">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded-full"
          minLength={6}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {error && (
        <p className="mt-4 font-bold text-center text-(--error)">{error}</p>
      )}

      {success && (
        <p className="mt-4 font-bold text-center text-(--error)">{success}</p>
      )}
    </form>
  );
}
