"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const router = useRouter();
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
      // Send registration data to the API
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
        setError(data.error);
      } else {
        setSuccess(
          "Registration successful! Pleasse log in with your new account."
        );
        setName("");
        setEmail("");
        setPassword("");
        setFieldErrors({});
        setTimeout(() => {
          router.push("/user/login");
        }, 1200);
      }
    } catch (error) {
      setError("Error: An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen w-full px-115 py-30 bg-white text-(--background)"
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
      <p className="text-md text-(--background-hover) mb-2 text-center">
        Already have an account?{" "}
        <Link
          href="/user/login"
          className="relative font-semibold text-(--background) hover:text-(--background-hover) transition-colors duration-300
             after:absolute after:bottom-0 after:left-0 after:h-[2px]
             after:w-0 after:bg-(--background) after:transition-all after:duration-300 after:ease-in-out
             hover:after:w-full"
        >
          Log in
        </Link>{" "}
        instead
      </p>
      <div className="flex justify-center">
        {" "}
        <button
          type="submit"
          className="relative px-6 py-2 rounded-full overflow-hidden text-(--background) bg-(--foreground) cursor-pointer group"
          disabled={loading}
        >
          {/* Background Wave */}
          <span className="absolute inset-0 before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-gradient-to-r before:from-gray-800 before:to-(--background) before:z-0 group-hover:before:left-0 before:transition-all before:duration-500 before:ease-in-out before:rounded-full z-0" />

          {/* Button Text */}
          <span className="group-hover:text-white relative z-10 text-lg font-semibold">
            Continue
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

      {success && (
        <p className="mt-4 text-center text-(--success)">{success}</p>
      )}
    </form>
  );
}
