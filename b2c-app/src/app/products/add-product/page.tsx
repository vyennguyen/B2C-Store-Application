"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    categories: "",
    images: "",
    description: "",
    price: "",
    color: "",
    switchType: "",
    availability: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    const payload = {
      name: form.name,
      categories: form.categories.split(",").map((cat) => cat.trim()),
      images: form.images.split(",").map((img) => img.trim()),
      description: form.description,
      price: parseFloat(form.price),
      color: form.color,
      switchType: form.switchType,
      availability: form.availability,
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Product added!");
      setForm({
        ...form,
        name: "",
        categories: "",
        images: "",
        description: "",
        price: "",
        color: "",
        switchType: "",
        availability: true,
      });
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
        <input
          name="color"
          placeholder="Color"
          value={form.color}
          onChange={handleChange}
        />
        <input
          name="switchType"
          placeholder="Switch Type"
          value={form.switchType}
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
