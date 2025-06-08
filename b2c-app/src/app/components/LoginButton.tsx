"use client";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  const handleLogin = async () => {
    // Optionally specify a provider, e.g. 'credentials'
    await signIn(undefined, { callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogin}
      className="text-(--background) bg-white font-semibold rounded-lg p-2 text-sm hover:bg-(--foreground) cursor-pointer"
    >
      Log In
    </button>
  );
}
