import { useEffect, useState } from "react";

interface WaterGaugeProps {
  level: number; // 0-100
  liters: number;
  capacity: number;
}

export function WaterGauge({ level, liters, capacity }: WaterGaugeProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedLevel(level), 100);
    return () => clearTimeout(timer);
  }, [level]);

  const cx = 110;
  const cy = 110;
  const r = 88;
  const circumference = 2 * Math.PI * r;
  const arcLength = circumference * 0.75;
  const valueDash = arcLength * (animatedLevel / 100);

  const getColor = (lvl: number) => {
    if (lvl > 60) return "#2563eb";
    if (lvl > 30) return "#f59e0b";
    return "#ef4444";
  };

  const getStatus = (lvl: number) => {
    if (lvl > 60)
      return { label: "Sufficient", color: "text-blue-600", bg: "bg-blue-50" };
    if (lvl > 30)
      return { label: "Low", color: "text-amber-600", bg: "bg-amber-50" };
    return { label: "Critical", color: "text-red-600", bg: "bg-red-50" };
  };

  const status = getStatus(animatedLevel);
  const color = getColor(animatedLevel);

  // Wave animation offset
  // const waveHeight = 100 - animatedLevel;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between w-full mb-4">
        <div>
          <h2 className="text-slate-800">Water Level</h2>
          <p className="text-slate-400 text-sm mt-0.5">Tank capacity monitor</p>
        </div>
        <span
          className={`text-xs px-3 py-1 rounded-full ${status.bg} ${status.color} font-medium`}
        >
          {status.label}
        </span>
      </div>

      <div className="relative flex items-center justify-center my-2 flex-1">
        <svg width="220" height="385" viewBox="0 0 220 200">
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="warnGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient
              id="dangerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={18}
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            strokeLinecap="round"
            transform={`rotate(135 ${cx} ${cy})`}
          />

          {/* Value arc */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={
              animatedLevel > 60
                ? "url(#gaugeGradient)"
                : animatedLevel > 30
                  ? "url(#warnGradient)"
                  : "url(#dangerGradient)"
            }
            strokeWidth={18}
            strokeDasharray={`${valueDash} ${circumference - valueDash}`}
            strokeLinecap="round"
            transform={`rotate(135 ${cx} ${cy})`}
            style={{ transition: "stroke-dasharray 1s ease-in-out" }}
            filter="url(#glow)"
          />

          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const angle = (135 + (tick / 100) * 270) * (Math.PI / 180);
            const innerR = r - 14;
            const outerR = r + 6;
            const x1 = cx + innerR * Math.cos(angle);
            const y1 = cy + innerR * Math.sin(angle);
            const x2 = cx + outerR * Math.cos(angle);
            const y2 = cy + outerR * Math.sin(angle);
            return (
              <line
                key={tick}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#cbd5e1"
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          })}

          {/* Center content */}
          <text
            x={cx}
            y={cy - 16}
            textAnchor="middle"
            fill={color}
            style={{
              fontSize: "36px",
              fontWeight: 700,
              transition: "fill 0.5s",
            }}
          >
            {Math.round(animatedLevel)}%
          </text>
          <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            fill="#94a3b8"
            style={{ fontSize: "13px" }}
          >
            {liters.toFixed(1)}L / {capacity}L
          </text>

          {/* Min/Max labels */}
          <text
            x={22}
            y={182}
            textAnchor="middle"
            fill="#94a3b8"
            style={{ fontSize: "11px" }}
          >
            0%
          </text>
          <text
            x={198}
            y={182}
            textAnchor="middle"
            fill="#94a3b8"
            style={{ fontSize: "11px" }}
          >
            100%
          </text>
        </svg>

        {/* Tank visual inside gauge */}
      </div>

      {/* Gauge levels reference */}
      <div className="flex gap-4 mt-2 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>{" "}
          Full (&gt;60%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>{" "}
          Low (30-60%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>{" "}
          Critical (&lt;30%)
        </span>
      </div>
    </div>
  );
}
