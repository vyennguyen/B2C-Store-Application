"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/user/login" });
  };

  return (
    <button
      onClick={handleLogout}
      className="text-(--background) bg-white font-semibold rounded-lg p-2 text-sm hover:bg-(--foreground) cursor-pointer"
    >
      Log Out
    </button>
  );
}
