"use client";

import { useEffect, useState } from "react";
import { User } from "./mock-data";
import { getCurrentUser } from "./actions";

export function useSession() {
  const [session, setSession] = useState<{
    user: User | null;
    loading: boolean;
  }>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    async function fetchSession() {
      try {
        const user = await getCurrentUser();
        setSession({ user, loading: false });
      } catch (error) {
        console.error("Error fetching session:", error);
        setSession({ user: null, loading: false });
      }
    }

    fetchSession();
  }, []);

  return session;
}
