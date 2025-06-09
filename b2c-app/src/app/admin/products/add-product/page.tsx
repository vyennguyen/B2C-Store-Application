"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { validateProductForm } from "../../../functions/validateProducts";

export default function AddProductPage() {
  const [success, setSuccess] = useState<boolean | null>(null);
  const inputClass = "border border-gray-300 rounded px-2 py-2"; // Shared style for input
  const [error, setError] = useState<string | null>(null);
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

  // Add user success message timeout
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Add user error message timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

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

    // Validate form data
    const errors = validateProductForm(form);
    if (errors.length > 0) {
      setError("Validation errors:\n" + errors.join("\n"));
      return;
    }

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
        type: form.switchType
          .split(",")
          .map((st) => st.trim())
          .join(", "),
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
      setError("Failed to add product. Please try again.");
      console.error("Missing fields");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2 text-center">Add Product</h1>
      <p className="text-gray-600 mb-6 text-center">
        Fill out the form below to add a new product. <br />
        Each product type has specific fields, so please select the correct type
        first.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-bold">Product Type</label>
        <select
          name="type"
          aria-label="Product Type"
          value={form.type}
          onChange={handleChange}
          className={inputClass}
          required
        >
          <option value="">Select Product Type</option>
          <option value="Keyboard">Keyboard</option>
          <option value="Keycap">Keycap</option>
          <option value="Switch">Switch</option>
        </select>

        <label className="font-bold">Product Name</label>
        <input
          name="name"
          aria-label="Product Name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
          required
        />
        <label className="font-bold">Product Categories</label>
        <input
          name="categories"
          aria-label="Product Categories"
          placeholder="Categories (comma separated)"
          value={form.categories}
          onChange={handleChange}
          className={inputClass}
        />
        <label className="font-bold">Product Images</label>
        <input
          name="images"
          aria-label="Product Images"
          placeholder="Image URLs (comma separated)"
          value={form.images}
          onChange={handleChange}
          className={inputClass}
        />
        <label className="font-bold">Product Description</label>
        <textarea
          name="description"
          aria-label="Product Description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className={inputClass}
        />
        <label className="font-bold">Product Price</label>
        <input
          name="price"
          aria-label="Product Price"
          placeholder="Price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          className={inputClass}
        />
        <label className="font-bold">
          Availability{" "}
          <input
            name="availability"
            aria-label="Product Availability"
            type="checkbox"
            checked={form.availability}
            onChange={handleChange}
            className={inputClass}
          />{" "}
          In Stock
        </label>

        {/* Keyboard form */}
        {form.type === "Keyboard" && (
          <>
            <label className="font-bold">Switch Type</label>
            <input
              name="switchType"
              aria-label="Keyboard Switch Type"
              placeholder="Switch Type"
              value={form.switchType}
              onChange={handleChange}
              className={inputClass}
            />
            <label className="font-bold">Color</label>
            <input
              name="color"
              aria-label="Keyboard Color"
              placeholder="Color"
              value={form.color}
              onChange={handleChange}
              className={inputClass}
            />
            <label className="font-bold">Keyboard Layout</label>
            <input
              name="layout"
              aria-label="Keyboard Layout"
              placeholder="Layout"
              value={form.layout}
              onChange={handleChange}
              className={inputClass}
            />
            <label className="font-bold">Backlight</label>
            <input
              name="backlight"
              aria-label="Keyboard Backlight"
              placeholder="Backlight"
              value={form.backlight}
              onChange={handleChange}
              className={inputClass}
            />
          </>
        )}

        {form.type === "Keycap" && (
          <>
            <label className="font-bold">Material</label>
            <input
              name="material"
              aria-label="Keycap Material"
              placeholder="Material"
              value={form.material}
              onChange={handleChange}
              className={inputClass}
            />
            <label className="font-bold">Profile</label>
            <input
              name="profile"
              aria-label="Keycap Profile"
              placeholder="Profile"
              value={form.profile}
              onChange={handleChange}
              className={inputClass}
            />
            <label className="font-bold">Color</label>
            <input
              name="color"
              aria-label="Keycap Color"
              placeholder="Color"
              value={form.color}
              onChange={handleChange}
              className={inputClass}
            />
            <label className="font-bold">Compatibility</label>
            <input
              name="compatibility"
              aria-label="Keycap Compatibility"
              placeholder="Compatibility"
              value={form.compatibility}
              onChange={handleChange}
              className={inputClass}
            />
          </>
        )}

        {form.type === "Switch" && (
          <>
            <label className="font-bold">Switch Type</label>
            <input
              name="switchType"
              aria-label="Switch Type"
              placeholder="Type"
              value={form.switchType}
              onChange={handleChange}
              className={inputClass}
            />
          </>
        )}

        {success && (
          <div className="mb-4 text-(--success) text-center">
            Product added successfully!
          </div>
        )}

        {error && (
          <div className="mb-4 text-(--error) text-center">
            An error occurred while adding the product. Please try again.
          </div>
        )}

        <div className="flex justify-center">
          {" "}
          <button
            type="submit"
            className="relative px-4 py-2 rounded-full overflow-hidden text-(--background) bg-(--foreground) cursor-pointer group"
          >
            {/* Background Wave */}
            <span className="absolute inset-0 before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-gradient-to-r before:from-gray-800 before:to-(--background) before:z-0 group-hover:before:left-0 before:transition-all before:duration-500 before:ease-in-out before:rounded-full z-0" />

            {/* Button Text */}
            <span className="group-hover:text-white relative z-10 text-lg font-semibold">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add New Product
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
