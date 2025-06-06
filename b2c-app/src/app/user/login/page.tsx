"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
      } else {
        // Success handling (e.g., redirect)
        console.log("Logged in!");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="h-screen w-full px-115 py-30 bg-(--foreground) text-(--background)"
    >
      <h2 className="text-2xl font-bold mb-3 text-center">Welcome Back</h2>

      <label className="block mb-2">
        Email
        <input
          type="email"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-2 border rounded-lg"
        />
      </label>

      <label className="block mb-4">
        Password
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded-lg"
        />
      </label>

      <p className="text-md text-(--background-hover) mb-2 text-center">
        Don't have an account?{" "}
        <Link
          href="/user/registration"
          className="relative font-semibold text-(--background) hover:text-(--background-hover) transition-colors duration-300
             after:absolute after:bottom-0 after:left-0 after:h-[2px]
             after:w-0 after:bg-(--background) after:transition-all after:duration-300 after:ease-in-out
             hover:after:w-full"
        >
          Create one
        </Link>
      </p>

      <p className="text-md text-center mb-6">
        <Link
          href="/user/reset-password"
          className="relative font-semibold text-(--background) hover:text-(--background-hover) transition-colors duration-300
             after:absolute after:bottom-0 after:left-0 after:h-[2px]
             after:w-0 after:bg-(--background) after:transition-all after:duration-300 after:ease-in-out
             hover:after:w-full"
        >
          Forgot your password?
        </Link>
      </p>

      <div className="flex justify-center">
        <button
          type="submit"
          className="relative px-6 py-2 rounded-full overflow-hidden text-(--background) bg-(--foreground) cursor-pointer group"
          disabled={loading}
        >
          {/* Background Wave */}
          <span className="absolute inset-0 before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-gradient-to-r before:from-gray-800 before:to-(--background) before:z-0 group-hover:before:left-0 before:transition-all before:duration-500 before:ease-in-out before:rounded-full z-0" />

          {/* Button Text */}
          <span className="group-hover:text-white relative z-10 text-lg font-semibold">
            Log in
          </span>
        </button>
      </div>

      {error && (
        <p className="mt-4 text-(--error) text-center">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-(--error) text-white mr-2">
            <FontAwesomeIcon icon={faExclamation} size="xs" />
          </span>
          {error}
        </p>
      )}
    </form>
  );
}
