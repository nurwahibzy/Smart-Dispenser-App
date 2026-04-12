"use client";

import { useEffect, useState } from "react";
import { getDispenseHistory } from "@/features/transaction/infrastructure/transaction.firebase";
import type { Transaction } from "@/types/transaction";

export const useTransactionData = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await getDispenseHistory();
      setData(res);
      setLoading(false);
    };

    fetch();
  }, []);

  return { data, loading };
};
