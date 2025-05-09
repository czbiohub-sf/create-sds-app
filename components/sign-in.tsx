"use client";

import { Button } from "@czi-sds/components";
import { useState } from "react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      window.location.href = "/api/auth/login";
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      setError("Authentication error. Please try again.");
    }
  };

  return (
    <div>
      <Button
        onClick={handleLogin}
        disabled={isLoading}
        sdsType="primary"
        sdsStyle="rounded"
      >
        {isLoading ? "Signing in..." : "Sign in with Okta"}
      </Button>
      {!!error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
}
