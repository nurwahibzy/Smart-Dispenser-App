import { useState } from "react";
import { submitHelpdesk } from "../service/helpdeskService";
import { HelpdeskPayload } from "@/types/helpdesk";

export const useSubmitTicket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const submitTicket = async (payload: HelpdeskPayload) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await submitHelpdesk(payload);
      setSuccessMessage(`${response.message}`);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitTicket, isLoading, error, successMessage };
};
