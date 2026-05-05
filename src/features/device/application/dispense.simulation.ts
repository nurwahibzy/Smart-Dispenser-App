type Mode = "idle" | "manual" | "auto";

type StartAutoParams = {
  selectedVolume: number;
  tds: number;
  setMode: (mode: Mode) => void;
  setProgress: (v: number) => void;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  progressRef: React.MutableRefObject<number>;
  onComplete?: () => void;
};

export function startAutoDispense({
  selectedVolume,
  setMode,
  setProgress,
  intervalRef,
  progressRef,
  onComplete,
}: StartAutoParams) {
  setMode("auto");

  progressRef.current = 0;
  setProgress(0);

  const duration = Math.max(1000, selectedVolume * 5);
  const stepTime = 100;
  const step = (100 / duration) * stepTime;

  intervalRef.current = setInterval(() => {
    progressRef.current += step;

    if (progressRef.current >= 100) {
      progressRef.current = 100;
      setProgress(100);

      clearInterval(intervalRef.current!);
      intervalRef.current = null;

      onComplete?.();

      setTimeout(() => {
        setMode("idle");
        setProgress(0);
      }, 300);

      return;
    }

    setProgress(progressRef.current);
  }, stepTime);
}

type StopAutoParams = {
  selectedVolume: number;
  tds: number;
  progressRef: React.MutableRefObject<number>;
  setMode: (mode: Mode) => void;
  setProgress: (v: number) => void;
};

export function stopAutoDispense({ setMode, setProgress }: StopAutoParams) {
  setMode("idle");
  setProgress(0);
}
