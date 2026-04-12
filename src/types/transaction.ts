export type Transaction = {
  id: string;
  actualVolume: number;
  requestedVolume: number;
  deviceId: string;
  status: boolean;
  tds: number;
  type: "auto" | "manual";
  timestamp: Date | null;
};
