"use client";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";

export default function RightMenu() {
  const [cartOpen, setCartOpen] = useState(false);

  // For demonstration, cart is always empty
  const cartIsEmpty = true;

  return (
    <nav aria-label="Right Menu">
      <div className="flex justify-center items-center gap-4 w-auto">
        <SearchBar />
        {/* Cart Button */}
        <button
          onClick={() => setCartOpen(true)}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Open Cart"
        >
          <FontAwesomeIcon icon={faBagShopping} />
          <span className="sr-only">Cart</span>
        </button>
        {/* Account Link */}
        <Link
          href="/account"
          className="flex items-center gap-2 cursor-pointer"
        >
          <FontAwesomeIcon icon={faUser} />
          <span className="sr-only">Account</span>
        </Link>
      </div>
      {/* Slide-out Cart Panel and Overlay */}
      {cartOpen && (
        <>
          {/* Dark overlay without blur */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setCartOpen(false)}
            aria-hidden="true"
          />

          <div
            className="fixed top-0 right-0 h-full w-80 z-50 shadow-lg bg-white transition-transform duration-300 transform"
            style={{
              transform: cartOpen ? "translate-x-0" : "translate-x-full",
            }}
          >
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-bold text-(--text-dark)">Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-gray-500 hover:text-black cursor-pointer"
                aria-label="Close Cart"
              >
                &times;
              </button>
            </div>
            <div className="p-6 text-center text-gray-500">
              {cartIsEmpty ? "Your cart is empty" : "Cart items go here"}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
