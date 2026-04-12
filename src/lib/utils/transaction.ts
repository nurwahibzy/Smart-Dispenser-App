import type { Transaction } from "@/types/transaction";

export const calculateDailyUsage = (transactions: Transaction[]) => {
  const now = new Date();

  // 🔥 DEBUG (boleh dihapus nanti)
  console.log("NOW:", now);

  const todayTransactions = transactions.filter((trx) => {
    const trxDate = trx.timestamp.toDate();

    // 🔥 DEBUG
    console.log("TRX DATE:", trxDate);

    return (
      trxDate.getDate() === now.getDate() &&
      trxDate.getMonth() === now.getMonth() &&
      trxDate.getFullYear() === now.getFullYear() &&
      trx.status === true
    );
  });

  console.log("FILTERED:", todayTransactions);

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
