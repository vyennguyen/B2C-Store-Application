"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/user/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-(--background) bg-(--foreground) font-semibold rounded-md p-2 text-sm cursor-pointer"
    >
      Log Out
    </button>
  );
}
