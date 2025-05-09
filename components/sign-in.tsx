"use client";

import { Button } from "@czi-sds/components";
import { useState, useEffect } from "react";

const UI_CONFIG = {
  POPUP: {
    width: 600,
    height: 700,
  },
};

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data === "AUTH_SUCCESS") {
        setIsLoading(false);
        setError(null);
        window.location.reload();
      }

      if (event.data.startsWith("AUTH_ERROR")) {
        setIsLoading(false);

        const errorCode = event.data.split(":")[1];
        let errorMessage = "Authentication error. Please try again.";

        if (errorCode === "invalid_state") {
          errorMessage = "Security verification failed. Please try again.";
        } else if (errorCode === "token_exchange_failed") {
          errorMessage = "Could not complete authentication. Please try again.";
        } else if (errorCode === "user_data_failed") {
          errorMessage =
            "Could not retrieve your profile information. Please try again.";
        } else if (errorCode === "missing_code") {
          errorMessage = "Authentication code missing. Please try again.";
        }

        setError(errorMessage);
      }

      if (event.data === "AUTH_CANCELLED") {
        setIsLoading(false);
        setError(null);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleLogin = () => {
    setIsLoading(true);
    setError(null);

    const authUrl = "/api/auth/login";

    const { width, height } = UI_CONFIG.POPUP;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      "Sign in with Okta",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`,
    );

    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      setIsLoading(false);
      setError(
        "Popup blocked. Please allow popups for this site and try again.",
      );
      return;
    }

    const checkPopup = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkPopup);
        setIsLoading(false);
      }
    }, 500);
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
