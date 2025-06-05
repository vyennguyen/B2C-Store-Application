"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
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
        switchType: form.switchType.split(",").map((st) => st.trim()),
        color: form.color.split(",").map((kc) => kc.trim()),
        layout: form.layout,
        backlight: form.backlight,
      };
    } else if (form.type === "Keycap") {
      payload.keycap = {
        material: form.material,
        profile: form.profile,
        color: form.color.split(",").map((kcc) => kcc.trim()),
        compatibility: form.compatibility.split(",").map((c) => c.trim()),
      };
    } else if (form.type === "Switch") {
      payload.switch = {
        type: form.switchType.split(",").map((st) => st.trim()),
      };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSuccess(true);
      setForm({
        name: "",
        type: "",
        categories: "",
        images: "",
        description: "",
        price: "",
        availability: true,
        switchType: "",
        color: "",
        layout: "",
        backlight: "",
        material: "",
        profile: "",
        compatibility: "",
      });
    } else {
      setSuccess(false);
      setError(true);
      console.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          name="type"
          aria-label="Product Type"
          value={form.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Product Type</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Keycap">Keycap</option>
          <option value="Switch">Switch</option>
        </select>
        <input
          name="name"
          aria-label="Product Name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="categories"
          aria-label="Product Categories"
          placeholder="Categories (comma separated)"
          value={form.categories}
          onChange={handleChange}
        />
        <input
          name="images"
          aria-label="Product Images"
          placeholder="Image URLs (comma separated)"
          value={form.images}
          onChange={handleChange}
        />
        <textarea
          name="description"
          aria-label="Product Description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          aria-label="Product Price"
          placeholder="Price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
        />
        <label>
          <input
            name="availability"
            aria-label="Product Availability"
            type="checkbox"
            checked={form.availability}
            onChange={handleChange}
          />{" "}
          In Stock
        </label>

        {/* Keyboard form */}
        {form.type === "Keyboard" && (
          <>
            <input
              name="switchType"
              aria-label="Keyboard Switch Type"
              placeholder="Switch Type"
              value={form.switchType}
              onChange={handleChange}
            />
            <input
              name="color"
              aria-label="Keyboard Color"
              placeholder="Color"
              value={form.color}
              onChange={handleChange}
            />
            <input
              name="layout"
              aria-label="Keyboard Layout"
              placeholder="Layout"
              value={form.layout}
              onChange={handleChange}
            />
            <input
              name="backlight"
              aria-label="Keyboard Backlight"
              placeholder="Backlight"
              value={form.backlight}
              onChange={handleChange}
            />
          </>
        )}

        {form.type === "Keycap" && (
          <>
            <input
              name="material"
              aria-label="Keycap Material"
              placeholder="Material"
              value={form.material}
              onChange={handleChange}
            />
            <input
              name="profile"
              aria-label="Keycap Profile"
              placeholder="Profile"
              value={form.profile}
              onChange={handleChange}
            />
            <input
              name="keycapColor"
              aria-label="Keycap Color"
              placeholder="Color"
              value={form.color}
              onChange={handleChange}
            />
            <input
              name="compatibility"
              aria-label="Keycap Compatibility"
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
              aria-label="Switch Type"
              placeholder="Type"
              value={form.switchType}
              onChange={handleChange}
            />
          </>
        )}

        {success && (
          <div className="mb-4 text-(--success) font-semibold">
            Product added successfully!
          </div>
        )}

        {error && (
          <div className="mb-4 text-(--error) font-semibold">
            An error occurred while adding the product. Please try again.
          </div>
        )}

        <button
          type="submit"
          className="bg-(--background) text-(--foreground) px-4 py-2 rounded cursor-pointer"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
