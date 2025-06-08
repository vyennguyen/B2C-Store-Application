"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ModifyProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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
    compatibility: "",
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);

        const product = await res.json();

        // Load product data into form state
        setForm({
          name: product.name || "",
          type: product.type || "",
          categories: (product.categories || []).filter(Boolean).join(", "),
          images: (product.images || []).filter(Boolean).join(", "),
          description: product.description || "",
          price: product.price?.toString() || "",
          availability: product.availability ?? true,

          switchType: [product.keyboard?.switchType, product.switch?.type]
            .filter(Boolean)
            .join(", "),

          color: [product.keyboard?.color, product.keycap?.color]
            .filter(Boolean)
            .join(", "),
          layout: product.keyboard?.layout || "",
          backlight: product.keyboard?.backlight || "",

          material: product.keycap?.material || "",
          profile: product.keycap?.profile || "",
          compatibility: (product.keycap?.compatibility || [])
            .filter(Boolean)
            .join(", "),
        });

        setLoading(false);
      } catch (err) {
        setError(true);
        console.error("Failed to fetch product", err);
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return <div className="text-center text-xl mt-10">Loading...</div>;

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
        compatibility: form.compatibility
          .split(",")
          .map((compa) => compa.trim()),
      };
    } else if (form.type === "Switch") {
      payload.switch = {
        type: form.switchType.split(",").map((st) => st.trim()),
      };
    }

    try {
      await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSuccess(true);
      setTimeout(() => router.push("/products"), 1200);
    } catch (error) {
      setError(true);
      console.error("Error updating product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Modify Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-bold">Product Name</label>
        <input
          name="name"
          aria-label="Product Name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />
        <label className="font-bold">Product Type</label>
        <input
          name="type"
          aria-label="Product Type"
          placeholder="Product Type"
          value={form.type}
          onChange={handleChange}
        />
        <label className="font-bold">Product Categories</label>
        <input
          name="categories"
          aria-label="Product Categories"
          placeholder="Categories (comma separated)"
          value={form.categories}
          onChange={handleChange}
        />
        <label className="font-bold">Product Images</label>
        <input
          name="images"
          aria-label="Product Images"
          placeholder="Image URLs (comma separated)"
          value={form.images}
          onChange={handleChange}
        />
        <label className="font-bold">Product Description</label>
        <textarea
          name="description"
          aria-label="Product Description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <label className="font-bold">Product Price</label>
        <input
          name="price"
          aria-label="Product Price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <label className="font-bold">Availability</label>
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

        {/* Conditionally rendered fields */}
        {form.type === "Keyboard" && (
          <>
            <label className="font-bold">Switch Type</label>
            <input
              name="switchType"
              aria-label="Keyboard Switch Type"
              placeholder="Switch Type"
              value={form.switchType}
              onChange={handleChange}
            />
            <label className="font-bold">Keyboard Color</label>
            <input
              name="color"
              aria-label="Keyboard Color"
              placeholder="Color"
              value={form.color}
              onChange={handleChange}
            />
            <label className="font-bold">Keyboard Layout</label>
            <input
              name="layout"
              aria-label="Keyboard Layout"
              placeholder="Layout"
              value={form.layout}
              onChange={handleChange}
            />
            <label className="font-bold">Backlight</label>
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
            <label className="font-bold">Material</label>
            <input
              name="material"
              aria-label="Keycap Material"
              placeholder="Material"
              value={form.material}
              onChange={handleChange}
            />
            <label className="font-bold">Profile</label>
            <input
              name="profile"
              aria-label="Keycap Profile"
              placeholder="Profile"
              value={form.profile}
              onChange={handleChange}
            />
            <label className="font-bold">Color</label>
            <input
              name="color"
              aria-label="Keycap Color"
              placeholder="Color"
              value={form.color}
              onChange={handleChange}
            />
            <label className="font-bold">Compatibility</label>
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
            <label className="font-bold">Switch Type</label>
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
          <div className="mb-4 text-(--success) text-center">
            Product updated successfully!
          </div>
        )}

        {error && (
          <div className="mb-4 text-(--error) text-center">
            An error has occured while updating the product. Please try again.
          </div>
        )}

        <button
          type="submit"
          className="bg-(--background) text-(--foreground) px-4 py-2 rounded cursor-pointer"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
