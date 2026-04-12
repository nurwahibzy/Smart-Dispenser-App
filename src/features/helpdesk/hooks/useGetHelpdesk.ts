import { useState } from "react";
import { getHelpdesk } from "../service/helpdeskService";

export const useFetchTicket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const FetchTicket = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await getHelpdesk();
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

  return { FetchTicket, isLoading, error, successMessage };
};
