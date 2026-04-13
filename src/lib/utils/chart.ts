import type { Transaction } from "@/types/transaction";

export const groupTransactionsByDay = (transactions: Transaction[]) => {
  const map: Record<string, number> = {};

  transactions.forEach((trx) => {
    // VALIDASI DATA
    if (!trx.status || !trx.timestamp) return;

    const date = trx.timestamp; // sudah Date

    const day = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    if (!map[day]) {
      map[day] = 0;
    }

    const volume = Number(trx.actualVolume);
    map[day] += isNaN(volume) ? 0 : volume;
  });

  return Object.entries(map).map(([day, total]) => ({
    day,
    liters: total / 1000,
  }));
};
