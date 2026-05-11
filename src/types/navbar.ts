export type NavbarAdminProps = {
  online: boolean;
  lastUpdate: Date;
  fluctuate: () => void;

  DeviceStatusBar: React.ComponentType<{
    online: boolean;
    lastUpdate: Date;
    onRefresh: () => void;
  }>;
};
