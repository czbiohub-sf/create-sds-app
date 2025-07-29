"use client";

import { useState } from "react";
import { Button } from "@czi-sds/components";
import { addItemAction } from "./actions";

export function AddItemForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await addItemAction(formData);
      if (result.error) {
        setError(result.error);
      } else {
        // Clear form on success
        const form = document.getElementById(
          "add-item-form",
        ) as HTMLFormElement;
        form?.reset();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="add-item-form"
      action={handleSubmit}
      className="flex flex-col gap-sds-l border-t border-sds-base-gray-300 pt-sds-xxl"
    >
      <h3 className="prose-sds-header-m-600-wide">Add New Item</h3>
      <div className="flex flex-col gap-sds-m">
        <input
          type="text"
          name="name"
          placeholder="Item name"
          required
          className="px-sds-m py-sds-s border border-sds-base-gray-400 rounded-sds-s"
        />
        <input
          type="text"
          name="description"
          placeholder="Description (optional)"
          className="px-sds-m py-sds-s border border-sds-base-gray-400 rounded-sds-s"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          step="0.01"
          min="0"
          className="px-sds-m py-sds-s border border-sds-base-gray-400 rounded-sds-s"
        />
        <Button
          type="submit"
          sdsType="primary"
          sdsStyle="rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Item"}
        </Button>
      </div>

      {error !== null && (
        <div className="text-sds-base-red-600 prose-sds-body-s-400-wide">
          {error}
        </div>
      )}
    </form>
  );
}
