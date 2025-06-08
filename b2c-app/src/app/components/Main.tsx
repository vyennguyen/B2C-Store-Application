"use client";

import Link from "next/link";
import Image from "next/image";

export default function Main() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-(--background)">
      {/* Hero Section */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to KlickyShop</h1>
        <p className="text-lg text-gray-700 mb-6">
          Explore custom mechanical keyboards, artisan keycaps, and premium
          switches.
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 text-white bg-(--background) hover:bg-(--background-hover) rounded-full text-lg font-semibold transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-bold text-center mb-10">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example Product Cards */}
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-4"
            >
              <div className="relative h-48 w-full mb-4">
                <Image
                  src="/white.jpg"
                  alt="Product image"
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">
                Mechanical Keyboard {idx + 1}
              </h3>
              <p className="text-gray-600 mb-2">
                A beautifully crafted 75% keyboard.
              </p>
              <p className="text-(--background) font-bold">$129.99</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Why Choose KlickyShop?</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          We're passionate about mechanical keyboards. From curated parts to
          fully built boards, we help you type better and feel better doing it.
        </p>
      </section>
    </main>
  );
}
