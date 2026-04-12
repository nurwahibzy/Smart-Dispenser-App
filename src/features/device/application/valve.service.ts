import { sendToggleValveCommand } from "@/features/device/infrastructure/device.firebase";

export const toggleValve = async () => {
  await sendToggleValveCommand();
};
