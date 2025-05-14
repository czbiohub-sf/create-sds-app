import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { PgTable } from "drizzle-orm/pg-core";

export function generateZodSchema<T extends PgTable>(
  model: T,
  customValidations?: Record<string, (schema: z.ZodTypeAny) => z.ZodTypeAny>,
) {
  const baseSchema = createInsertSchema(model);

  if (!customValidations) {
    return baseSchema;
  }

  const schemaShape = baseSchema.shape;
  const newShape: Record<string, z.ZodTypeAny> = { ...schemaShape };

  for (const [field, validator] of Object.entries(customValidations)) {
    if (field in schemaShape) {
      newShape[field] = validator(
        schemaShape[field as keyof typeof schemaShape],
      );
    }
  }

  return z.object(newShape);
}

export const validations = {
  minLength: (min: number, message?: string) => (schema: z.ZodTypeAny) => {
    if (schema instanceof z.ZodString) {
      return schema.min(min, message || `Must be at least ${min} characters`);
    }
    return schema;
  },

  maxLength: (max: number, message?: string) => (schema: z.ZodTypeAny) => {
    if (schema instanceof z.ZodString) {
      return schema.max(max, message || `Must be at most ${max} characters`);
    }
    return schema;
  },

  email: (message?: string) => (schema: z.ZodTypeAny) => {
    if (schema instanceof z.ZodString) {
      return schema.email(message || "Invalid email format");
    }
    return schema;
  },

  min: (min: number, message?: string) => (schema: z.ZodTypeAny) => {
    if (schema instanceof z.ZodNumber) {
      return schema.min(min, message || `Must be at least ${min}`);
    }
    return schema;
  },

  max: (max: number, message?: string) => (schema: z.ZodTypeAny) => {
    if (schema instanceof z.ZodNumber) {
      return schema.max(max, message || `Must be at most ${max}`);
    }
    return schema;
  },

  positive: (message?: string) => (schema: z.ZodTypeAny) => {
    if (schema instanceof z.ZodNumber) {
      return schema.positive(message || "Must be a positive number");
    }
    return schema;
  },
};
