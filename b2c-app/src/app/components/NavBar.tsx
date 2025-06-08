"use client";

import MiddleMenu from "./MiddleMenu";
import RightMenu from "./RightMenu";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const isAdmin = role?.toUpperCase() === "ADMIN";
  const logoLink = isAdmin ? "/admin" : "/";

  return (
    <div
      aria-label="Navigation Bar"
      className="flex justify-between items-center w-full py-5 px-5 text-xl bg-(--background) text-(--text-light)"
    >
      <Link href={logoLink} aria-label="Logo">
        Klicky Shop
      </Link>
      <MiddleMenu />
      <RightMenu />
    </div>
  );
}
