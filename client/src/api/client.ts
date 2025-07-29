import createClient from "openapi-fetch";
import type { paths } from "./generated/types";

export const apiClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
});
