"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ModifyProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [form, setForm] = useState({
    name: "",
    type: "",
    categories: "",
    images: "",
    description: "",
    price: "",
    availability: true,

    // shared
    switchType: "",
    color: "",

    // keyboard
    layout: "",
    backlight: "",

    // keycap
    material: "",
    profile: "",
    keycapColor: "",
    compatibility: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const product = await res.json();

        setForm({
          name: product.name || "",
          type: product.type || "",
          categories: (product.categories || []).join(", "),
          images: (product.images || []).join(", "),
          description: product.description || "",
          price: product.price?.toString() || "",
          availability: product.availability ?? true,

          switchType:
            product.keyboard?.switchType || product.switch?.type || "",
          color: product.keyboard?.color || product.keycap?.color || "",
          layout: product.keyboard?.layout || "",
          backlight: product.keyboard?.backlight?.toString() || "",

          material: product.keycap?.material || "",
          profile: product.keycap?.profile || "",
          keycapColor: product.keycap?.color || "",
          compatibility: product.keycap?.compatibility || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch product", err);
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

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
    setSubmitting(true);

    const payload: any = {
      name: form.name,
      type: form.type,
      categories: form.categories.split(",").map((c) => c.trim()),
      images: form.images.split(",").map((i) => i.trim()),
      description: form.description,
      price: parseFloat(form.price),
      availability: form.availability,
    };

    if (form.type === "Keyboard") {
      payload.keyboard = {
        switchType: form.switchType,
        color: form.color,
        layout: form.layout,
        backlight: form.backlight === "true",
      };
    } else if (form.type === "Keycap") {
      payload.keycap = {
        material: form.material,
        profile: form.profile,
        color: form.keycapColor,
        compatibility: form.compatibility,
      };
    } else if (form.type === "Switch") {
      payload.switch = {
        type: form.switchType,
      };
    }

    try {
      await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      router.push("/products");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Modify Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="type"
          placeholder="Type (Keyboard, Keycap, Switch)"
          value={form.type}
          onChange={handleChange}
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
          type="number"
          step="0.01"
          placeholder="Price"
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
            <input
              name="color"
              placeholder="Color"
              value={form.color}
              onChange={handleChange}
            />
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
