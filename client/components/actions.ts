"use server";

import { revalidatePath } from "next/cache";
import { apiClient } from "@/src/api/client";

export async function addItemAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);

  // Validate inputs
  if (!name || !price || isNaN(price)) {
    return { error: "Please provide a valid name and price" };
  }

  try {
    const { data, error } = await apiClient.POST("/items", {
      body: {
        name,
        description: description || undefined,
        price,
      },
    });

    if (error) {
      return { error: "Failed to add item. Please try again." };
    }

    // Revalidate the page to show the new item
    revalidatePath("/");

    return { success: true, data };
  } catch (err) {
    console.error("Error creating item:", err);
    return { error: "An unexpected error occurred" };
  }
}
