import { users, products } from "../../db/schema";
import { generateZodSchema, validations } from "./schema-utils";

export const userSchema = generateZodSchema(users, {
  name: validations.minLength(2, "Name must be at least 2 characters"),
  email: validations.email("Invalid email format"),
  age: validations.min(18, "You must be at least 18 years old"),
});

export const productSchema = generateZodSchema(products, {
  name: validations.minLength(3, "Product name must be at least 3 characters"),
  price: validations.min(1, "Price must be positive"),
});

export const fieldMetadata = {
  users: {
    name: {
      label: "Name",
      type: "text" as const,
      placeholder: "Enter your name",
      helperText: "Your full name",
    },
    email: {
      label: "Email",
      type: "email" as const,
      placeholder: "Enter your email",
      helperText: "Your email address",
    },
    age: {
      label: "Age",
      type: "number" as const,
      placeholder: "Enter your age",
      helperText: "Must be at least 18",
    },
    isActive: {
      label: "Active",
      type: "checkbox" as const,
      helperText: "Is this user active?",
    },
    birthDate: {
      label: "Birth Date",
      type: "date" as const,
      helperText: "Your date of birth",
    },
  },
  products: {
    name: {
      label: "Product Name",
      type: "text" as const,
      placeholder: "Enter product name",
      helperText: "Name of the product",
    },
    description: {
      label: "Description",
      type: "text" as const,
      placeholder: "Enter product description",
      helperText: "Detailed description of the product",
    },
    price: {
      label: "Price",
      type: "number" as const,
      placeholder: "Enter price in cents",
      helperText: "Price in cents (e.g., 1999 for $19.99)",
    },
    inStock: {
      label: "In Stock",
      type: "checkbox" as const,
      helperText: "Is this product in stock?",
    },
    createdAt: {
      label: "Created At",
      type: "date" as const,
      helperText: "Date when the product was created",
    },
  },
};

export const defaultValues = {
  users: {
    name: "",
    email: "",
    age: undefined,
    isActive: true,
    birthDate: undefined,
  },
  products: {
    name: "",
    description: "",
    price: undefined,
    inStock: true,
    createdAt: new Date().toISOString().substring(0, 10),
  },
};
