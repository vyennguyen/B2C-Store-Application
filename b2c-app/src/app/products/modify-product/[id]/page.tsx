"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ModifyProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

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

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch product by ID and populate form
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const product = await res.json();

        setForm({
          name: product.name || "",
          categories: (product.categories || []).join(", "),
          images: (product.images || []).join(", "),
          description: product.description || "",
          price: product.price?.toString() || "",
          color: product.color || "",
          switchType: product.switchType || "",
          availability: product.availability ?? true,
        });

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch product", err);
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  // Handle input changes
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

  // Submit updated product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          categories: form.categories.split(",").map((c) => c.trim()),
          images: form.images.split(",").map((i) => i.trim()),
          description: form.description,
          price: parseFloat(form.price),
          color: form.color,
          switchType: form.switchType,
          availability: form.availability,
        }),
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
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
