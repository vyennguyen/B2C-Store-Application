"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    categories: "",
    images: "",
    description: "",
    price: "",
    availability: true,

    // Shared
    switchType: "",
    color: "",

    // Keyboard
    layout: "",
    backlight: "",

    // Keycap
    material: "",
    profile: "",
    keycapColor: "",
    compatibility: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      name: form.name,
      type: form.type,
      categories: form.categories.split(",").map((cat) => cat.trim()),
      images: form.images.split(",").map((img) => img.trim()),
      description: form.description,
      price: parseFloat(form.price),
      availability: form.availability,
    };

    if (form.type === "Keyboard") {
      payload.keyboard = {
        switchType: form.switchType,
        color: form.color,
        layout: form.layout,
        backlight: form.backlight,
      };
    } else if (form.type === "Keycap") {
      payload.keycap = {
        material: form.material,
        profile: form.profile,
        color: form.keycapColor,
        compatibility: form.compatibility.split(",").map((c) => c.trim()),
      };
    } else if (form.type === "Switch") {
      payload.switch = {
        type: form.switchType,
      };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Product added!");
      window.location.reload();
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Keycap">Keycap</option>
          <option value="Switch">Switch</option>
        </select>
        <input
          name="categories"
          placeholder="Categories (comma separated)"
          value={form.categories}
          onChange={handleChange}
        />
        <input
          name="images"
          placeholder="Image URLs (comma separated)"
          value={form.images}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
        />
        <label>
          <input
            name="availability"
            type="checkbox"
            checked={form.availability}
            onChange={handleChange}
          />{" "}
          Available
        </label>

        {/* Conditionally rendered fields */}
        {form.type === "Keyboard" && (
          <>
            <input
              name="switchType"
              placeholder="Switch Type"
              value={form.switchType}
              onChange={handleChange}
            />
            <input
              name="color"
              placeholder="Color"
              value={form.color}
              onChange={handleChange}
            />
            <input
              name="layout"
              placeholder="Layout"
              value={form.layout}
              onChange={handleChange}
            />
            <input
              name="backlight"
              placeholder="Backlight (true/false)"
              value={form.backlight}
              onChange={handleChange}
            />
          </>
        )}

        {form.type === "Keycap" && (
          <>
            <input
              name="material"
              placeholder="Material"
              value={form.material}
              onChange={handleChange}
            />
            <input
              name="profile"
              placeholder="Profile"
              value={form.profile}
              onChange={handleChange}
            />
            <input
              name="keycapColor"
              placeholder="Color"
              value={form.keycapColor}
              onChange={handleChange}
            />
            <input
              name="compatibility"
              placeholder="Compatibility"
              value={form.compatibility}
              onChange={handleChange}
            />
          </>
        )}

        {form.type === "Switch" && (
          <>
            <input
              name="switchType"
              placeholder="Type"
              value={form.switchType}
              onChange={handleChange}
            />
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
