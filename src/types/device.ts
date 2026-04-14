export type DeviceData = {
  sensors: {
    waterLevel: number;
    tds: number;
    glassDetected: boolean;
  };
  status: {
    lastUpdated: number;
    online: boolean;
    systemStatus?: string;
    valveOpen?: boolean;
  };
  commands?: {
    toggleValve?: {
      action: string;
      timestamp: number;
    };
    dispense?: {
      volume: number;
      status: string;
      timestamp?: number;
    };
  };
  kiosk?: {
    isDispensing: boolean;
    targetVolume: number;
    filledVolume: number;
    status: "idle" | "filling" | "completed";
    updatedAt: number;
  };
};
