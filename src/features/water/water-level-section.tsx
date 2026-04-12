"use client";

import { useEffect, useState, useCallback } from "react";
import { WaterGauge } from "./water-gauge";

export default function WaterLevelSection() {
  const [waterLevel, setWaterLevel] = useState(72);

  // simulasi sensor (nanti bisa diganti API/Firebase)
  const fluctuate = useCallback(() => {
    setWaterLevel((v) =>
      Math.max(5, Math.min(100, v + (Math.random() - 0.5) * 1.5)),
    );
  }, []);

  useEffect(() => {
    const id = setInterval(fluctuate, 3000);
    return () => clearInterval(id);
  }, [fluctuate]);

  const liters = +(20 * (waterLevel / 100)).toFixed(1);

  return <WaterGauge level={waterLevel} liters={liters} capacity={20} />;
}
