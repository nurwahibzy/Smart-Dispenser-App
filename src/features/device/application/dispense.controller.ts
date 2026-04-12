import { dispenseWater } from "./dispense.service";

type StartAutoParams = {
  selectedVolume: number;
  tds: number;
  setMode: (v: "idle" | "manual" | "auto") => void;
  setIsDispensing: (v: boolean) => void;
  setProgress: (v: number) => void;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  progressRef: React.MutableRefObject<number>;
};

export const startAutoDispense = ({
  selectedVolume,
  tds,
  setMode,
  setIsDispensing,
  setProgress,
  intervalRef,
  progressRef,
}: StartAutoParams) => {
  setMode("auto");
  setIsDispensing(true);

  let progress = 0;
  progressRef.current = 0;

  intervalRef.current = setInterval(() => {
    progress += 10;
    progressRef.current = progress;

    setProgress(progress);

    if (progress >= 100) {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;

      setIsDispensing(false);
      setProgress(0);
      setMode("idle");

      // ✅ selesai full volume
      dispenseWater({
        volume: selectedVolume,
        tds,
      });
    }
  }, 200);
};

type StopAutoParams = {
  selectedVolume: number;
  tds: number;
  progressRef: React.MutableRefObject<number>;
  setMode: (v: "idle" | "manual" | "auto") => void;
  setIsDispensing: (v: boolean) => void;
  setProgress: (v: number) => void;
};

export const stopAutoDispense = ({
  selectedVolume,
  tds,
  progressRef,
  setMode,
  setIsDispensing,
  setProgress,
}: StopAutoParams) => {
  const actualVolume = Math.round((progressRef.current / 100) * selectedVolume);

  console.log("STOP AUTO → actualVolume:", actualVolume);

  // ✅ simpan hasil real
  dispenseWater({
    volume: actualVolume,
    tds,
  });

  setIsDispensing(false);
  setProgress(0);
  setMode("idle");
};
