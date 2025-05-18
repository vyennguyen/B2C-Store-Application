"use client";

import MiddleMenu from "./MiddleMenu";
import RightMenu from "./RightMenu";
import Link from "next/link";

export default function NavBar() {
  return (
    <div
      aria-label="Navigation Bar"
      className="flex justify-between items-center w-full py-5 px-5 text-xl bg-(--background) text-(--text-light)"
    >
      <>
        <Link href="/" aria-label="Logo">
          Logo
        </Link>
      </>
      <MiddleMenu />
      <RightMenu />
    </div>
  );
}
