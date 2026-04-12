import type { Transaction } from "@/types/transaction";

export const calculateDailyUsage = (transactions: Transaction[]) => {
  const now = new Date();

  const todayTransactions = transactions.filter((trx) => {
    if (!trx.timestamp) return false; // handle null

    const trxDate = trx.timestamp;

    return (
      trxDate.getDate() === now.getDate() &&
      trxDate.getMonth() === now.getMonth() &&
      trxDate.getFullYear() === now.getFullYear() &&
      trx.status === true
    );
  });

  const totalDispenses = todayTransactions.length;

  const totalVolumeMl = todayTransactions.reduce(
    (sum, trx) => sum + (trx.actualVolume ?? 0),
    0,
  );

  return {
    totalDispenses,
    dailyUsage: totalVolumeMl / 1000,
  };
};
