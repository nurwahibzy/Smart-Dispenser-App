import { sendDispenseCommand } from "@/features/device/infrastructure/device.firebase";
import { addTransaction } from "@/features/transaction/infrastructure/transaction.firebase";

export const dispenseWater = async ({
  volume,
  tds,
}: {
  volume: number;
  tds: number;
}) => {
  // kirim ke device
  await sendDispenseCommand(volume);

  // simpan history
  await addTransaction({
    actualVolume: volume,
    requestedVolume: volume,
    type: "auto",
    tds,
  });
};
