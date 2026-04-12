import { useEffect, useState } from "react";
import { subscribeDispenseHistory } from "@/features/transaction/infrastructure/transaction.firebase";
import type { Transaction } from "@/types/transaction";

export const useTransactionData = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeDispenseHistory((transactions) => {
      setData(transactions);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { data, loading };
};
