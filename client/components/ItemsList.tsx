import { apiClient } from "@/src/api/client";
import type { components } from "@/src/api/generated/types";

// This is a Server Component - no "use client" directive
export async function ItemsList() {
  // Fetch data directly on the server with full type safety
  const { data: items, error } = await apiClient.GET("/items");

  if (error) {
    return (
      <div className="prose-sds-body-m-400-wide text-sds-base-red-600">
        Error loading items
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-sds-l">
      {items?.map((item: components["schemas"]["Item"]) => (
        <div
          key={item.id}
          className="border border-sds-base-gray-400 p-sds-l rounded-sds-m"
        >
          <h3 className="prose-sds-body-l-600-wide">{item.name}</h3>
          <p className="prose-sds-body-m-400-wide text-sds-base-gray-600 mt-sds-xxxs">
            {item.description}
          </p>
          <span className="prose-sds-body-m-600-wide">
            ${item.price.toFixed(2)}
          </span>
        </div>
      ))}
      {items?.length === 0 && (
        <p className="prose-sds-body-m-400-wide text-sds-base-gray-600">
          No items found. Add one to get started!
        </p>
      )}
    </div>
  );
}
