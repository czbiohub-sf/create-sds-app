import "dotenv/config";
import { drizzle as drizzleNodePostgres } from "drizzle-orm/node-postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { Pool } from "pg";

let db: ReturnType<typeof drizzleNodePostgres> | ReturnType<typeof drizzleNeon>;

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

// Check if the DATABASE_URL indicates a Neon connection
if (process.env.DATABASE_URL.includes("neon.tech")) {
  console.log("Using Neon database connection");
  const sql = neon(process.env.DATABASE_URL);
  // Use drizzleNeon for NeonDB
  db = drizzleNeon(sql);
} else {
  console.log("Using local PostgreSQL database connection");
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  // Use drizzleNodePostgres for other PostgreSQL connections (e.g., local Docker)
  db = drizzleNodePostgres(pool);
}

export { db };
