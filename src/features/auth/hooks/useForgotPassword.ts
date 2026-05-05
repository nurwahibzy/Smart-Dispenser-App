import { useState } from "react";
import { passwordResetService } from "@/features/auth/service/passwordResetService";

interface UseForgotPasswordReturn {
  requestReset: (email: string) => Promise<boolean>;
  loading: boolean;
  error: string;
  message: string;
  cooldown: number;
}

export function useForgotPassword(): UseForgotPasswordReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  async function requestReset(email: string): Promise<boolean> {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const result = await passwordResetService.requestReset({ email });
      setMessage(result.message);

      setCooldown(60);
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";

      setError(errorMessage);

      if (errorMessage.toLowerCase().includes("terlalu banyak request")) {
        setCooldown(60);
      }

      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    requestReset,
    loading,
    error,
    message,
    cooldown,
  };
}