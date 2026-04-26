import { useState } from "react";
import { passwordResetService } from "@/features/auth/service/passwordResetService";

interface UseForgotPasswordReturn {
  requestReset: (email: string) => Promise<boolean>;
  loading: boolean;
  error: string;
  message: string;
  clearMessages: () => void;
}

export function useForgotPassword(): UseForgotPasswordReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function requestReset(email: string): Promise<boolean> {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const result = await passwordResetService.requestReset({ email });
      setMessage(result.message);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }

  function clearMessages() {
    setError("");
    setMessage("");
  }

  return {
    requestReset,
    loading,
    error,
    message,
    clearMessages,
  };
}