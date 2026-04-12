import { Timestamp } from "firebase/firestore";

export type Transaction = {
  id: string;
  actualVolume: number;
  requestedVolume: number;
  deviceId: string;
  status: boolean;
  tds: number;
  timestamp: Timestamp;
};
