import { useState } from "react";
import { useRouter } from "next/navigation";
import { passwordResetService } from "@/features/auth/service/passwordResetService";

interface UseResetPasswordReturn {
  resetPassword: (token: string, password: string) => Promise<boolean>;
  loading: boolean;
  error: string;
  success: boolean;
}

export function useResetPassword(): UseResetPasswordReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function resetPassword(
    token: string,
    password: string,
  ): Promise<boolean> {
    setError("");
    setLoading(true);

    try {
      await passwordResetService.resetPassword({ token, password });
      setSuccess(true);

      setTimeout(() => {
        router.push("/admin/login");
      }, 3000);

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

  return {
    resetPassword,
    loading,
    error,
    success,
  };
}