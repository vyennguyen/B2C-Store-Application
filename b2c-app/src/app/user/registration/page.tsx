"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});

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
        if (data.fields) {
          setFieldErrors(data.fields);
        }
        setError(data.error); // Default error message
      } else {
        setSuccess("Registration successful! You can now log in.");
        setName("");
        setEmail("");
        setPassword("");
        setFieldErrors({});
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
      className="h-screen w-full px-115 py-20 bg-(--foreground) text-(--background)"
    >
      <h2 className="text-2xl font-bold mb-3 text-center">Create an Account</h2>

      <label className="block mb-2">
        Name
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setFieldErrors((prev) => ({ ...prev, name: undefined }));
          }}
          className="w-full mt-1 p-2 border rounded-lg"
        />
        {fieldErrors.name && (
          <p className="text-sm text-(--error) mt-1 flex items-center gap-1">
            {" "}
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-(--error) text-white">
              <FontAwesomeIcon icon={faExclamation} size="xs" />
            </span>
            {fieldErrors.name}
          </p>
        )}
      </label>

      <label className="block mb-2">
        Email
        <input
          type="email"
          placeholder="example@mail.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }}
          className="w-full mt-1 p-2 border rounded-lg"
        />
        {fieldErrors.email && (
          <p className="text-sm text-(--error) mt-1 flex items-center gap-1">
            {" "}
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-(--error) text-white">
              <FontAwesomeIcon icon={faExclamation} size="xs" />
            </span>
            {fieldErrors.email}
          </p>
        )}
      </label>

      <label className="block mb-2">
        Password
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }}
          className="w-full mt-1 p-2 border rounded-lg"
          minLength={6}
        />
        {fieldErrors.password && (
          <p className="text-sm text-(--error) mt-1 flex items-center gap-1">
            {" "}
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-(--error) text-white">
              <FontAwesomeIcon icon={faExclamation} size="xs" />
            </span>
            {fieldErrors.password}
          </p>
        )}
      </label>
      <p className="text-sm text-(--background-hover) mb-2 text-center">
        Already have an account?{" "}
        <Link
          href="/user/login"
          className="underline font-semibold hover:text-(--background)"
        >
          Log in
        </Link>{" "}
        instead
      </p>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-30 bg-(--background) text-(--foreground) py-2 rounded-full hover:bg-(--background-hover) cursor-pointer"
          disabled={loading}
        >
          Continue
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

      {success && <p className="mt-4 text-center text-(--error)">{success}</p>}
    </form>
  );
}
