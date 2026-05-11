import {ForgotPasswordRequest,ResetPasswordRequest} from "@/types/auth";

 class PasswordResetService {
  async requestReset(data: ForgotPasswordRequest) {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || "Terjadi kesalahan");
    }

    return result;
  }

  async resetPassword(data: ResetPasswordRequest) {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || "Terjadi kesalahan");
    }

    return result;
  }
}

export const passwordResetService = new PasswordResetService();