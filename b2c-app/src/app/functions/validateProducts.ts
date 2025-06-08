// Validate product forms

export type ProductFormState = {
  name: string;
  type: string;
  categories: string;
  images: string;
  description: string;
  price: string;
  availability: boolean;
  switchType: string;
  color: string;
  layout: string;
  backlight: string;
  material: string;
  profile: string;
  compatibility: string;
};

export function validateProductForm(form: ProductFormState): string[] {
  const errors: string[] = [];

  if (!form.name.trim()) errors.push("Product name is required.");
  if (!form.type) errors.push("Product type is required.");
  if (
    !form.price ||
    isNaN(parseFloat(form.price)) ||
    parseFloat(form.price) <= 0
  )
    errors.push("Price must be a positive number.");

  if (form.images) {
    const imageArray = form.images.split(",");
    imageArray.forEach((img) => {
      try {
        new URL(img.trim());
      } catch {
        errors.push(`Invalid image URL: ${img.trim()}`);
      }
    });
  }

  if (form.type === "Keyboard") {
    if (!form.switchType.trim())
      errors.push("Switch type is required for keyboards.");
    if (!form.color.trim()) errors.push("Color is required for keyboards.");
    if (!form.layout.trim()) errors.push("Layout is required.");
    if (!form.backlight.trim()) errors.push("Backlight is required.");
  }

  if (form.type === "Keycap") {
    if (!form.material.trim()) errors.push("Material is required.");
    if (!form.profile.trim()) errors.push("Profile is required.");
    if (!form.color.trim()) errors.push("Color is required.");
    if (!form.compatibility.trim()) errors.push("Compatibility is required.");
  }

  if (form.type === "Switch") {
    if (!form.switchType.trim()) errors.push("Type is required for switch.");
  }

  return errors;
}
