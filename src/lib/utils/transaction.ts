import type { Transaction } from "@/types/transaction";
export const calculateDailyUsage = (transactions: Transaction[]) => {
  const now = new Date();

  const todayTransactions = transactions.filter((trx) => {
    if (!trx.timestamp) return false;

    const trxDate = trx.timestamp;

    return (
      trxDate.getDate() === now.getDate() &&
      trxDate.getMonth() === now.getMonth() &&
      trxDate.getFullYear() === now.getFullYear() &&
      trx.status === true
    );
  });

  const totalDispenses = todayTransactions.length;

  const totalVolumeMl = todayTransactions.reduce((sum, trx) => {
    const volume = Number(trx.actualVolume);
    return sum + (isNaN(volume) ? 0 : volume);
  }, 0);

  return {
    totalDispenses,
    dailyUsage: totalVolumeMl / 1000,
  };
};
