"use client";

import { useEffect, useState } from "react";
import { User } from "./mock-data";

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
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const data = await response.json();
          setSession({ user: data.user, loading: false });
        } else {
          setSession({ user: null, loading: false });
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setSession({ user: null, loading: false });
      }
    }

    fetchSession();
  }, []);

  return session;
}
