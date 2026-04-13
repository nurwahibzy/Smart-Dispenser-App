export type NavbarAdminProps = {
  online: boolean;
  lastUpdate: Date;
  fluctuate: () => void;
  notifications: number;
  setNotifications: React.Dispatch<React.SetStateAction<number>>;
  DeviceStatusBar: React.ComponentType<{
    online: boolean;
    lastUpdate: Date;
    onRefresh: () => void;
  }>;
};
