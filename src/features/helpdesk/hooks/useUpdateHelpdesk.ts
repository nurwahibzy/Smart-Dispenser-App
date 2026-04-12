import { useState } from "react";
import { updateHelpdeskStatus } from "../service/helpdeskService";

export const useUpdateHelpdesk = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateStatus = async (ticketId: string, newStatus: string) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await updateHelpdeskStatus(ticketId, newStatus);
      setSuccessMessage("Status berhasil diperbarui.");
      return response;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateStatus, isLoading, error, successMessage };
};
