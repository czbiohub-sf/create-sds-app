import { ItemsList } from "./ItemsList";
import { AddItemForm } from "./AddItemForm";

// This is a Server Component that combines the list and form
export default async function ItemsPage() {
  return (
    <div className="flex flex-col gap-sds-xxl">
      <h2 className="prose-sds-header-l-600-wide">Items Management</h2>

      {/* Server Component - Fetches and displays items */}
      <ItemsList />

      {/* Client Component - Handles form interactions */}
      <AddItemForm />
    </div>
  );
}
