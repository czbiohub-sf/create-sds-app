import "dotenv/config";
import { drizzle as drizzleNodePostgres } from "drizzle-orm/node-postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { Pool } from "pg";

let db: ReturnType<typeof drizzleNodePostgres> | ReturnType<typeof drizzleNeon>;

if (process.env.NODE_ENV === "production") {
  console.log("Using Neon database connection");
  const sql = neon(process.env.DATABASE_URL!);
  // Use drizzleNeon for production (Neon)
  db = drizzleNeon(sql);
} else {
  console.log("Using local PostgreSQL database connection");
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set for local development");
  }
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  // Use drizzleNodePostgres for development (local Docker PG)
  db = drizzleNodePostgres(pool);
}

export { db };
