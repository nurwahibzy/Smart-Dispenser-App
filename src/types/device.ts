export type DeviceData = {
  sensors: {
    glassDetected: boolean;
    tds: number;
    waterLevel: number;
  };
  status: {
    lastUpdated: number;
    online: boolean;
    systemStatus: string;
  };
};
