"use client";

import MiddleMenu from "./MiddleMenu";

function NavBar() {
  return (
    <div className="flex justify-center items-center w-auto">
      <div className="flex" aria-label="Logo">
        Logo
      </div>
      <div>
        <MiddleMenu />
      </div>
    </div>
  );
}

export default NavBar;
