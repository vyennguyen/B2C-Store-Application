"use client";

import MiddleMenu from "./MiddleMenu";
import RightMenu from "./RightMenu";
import Link from "next/link";

export default function NavBar() {
  return (
    <div
      aria-label="Navigation Bar"
      className="flex justify-between items-center w-full py-5 px-10 text-lg"
    >
      <div aria-label="Logo">
        <Link href="/">Logo</Link>
      </div>
      <MiddleMenu />
      <RightMenu />
    </div>
  );
}
