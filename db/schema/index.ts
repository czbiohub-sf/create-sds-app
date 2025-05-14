import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  date,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  age: integer("age").notNull(), // Min age will be handled by Zod schema
  isActive: boolean("is_active").default(true),
  birthDate: date("birth_date"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: varchar("description", { length: 1000 }),
  price: integer("price").notNull(),
  inStock: boolean("in_stock").default(true),
  createdAt: date("created_at").defaultNow(),
});
