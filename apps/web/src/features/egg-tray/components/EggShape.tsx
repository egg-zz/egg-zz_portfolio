import { motion } from "motion/react";
import type { EggType } from "../model/types";
import { EGG_CONFIG } from "../model/egg-config";

function CrackedEggOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 60 80"
      fill="none"
      aria-hidden="true"
    >
      {/* Main crack */}
      <polyline
        points="30,18 26,30 32,37 27,52 29,62"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Branch crack left */}
      <line
        x1="26" y1="30" x2="20" y2="36"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Branch crack right */}
      <line
        x1="32" y1="37" x2="39" y2="42"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Tiny crack at top */}
      <line
        x1="30" y1="18" x2="34" y2="12"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EggShape({ type, day, onClick, isActive, editable }: {
  type: EggType;
  day: number;
  onClick: () => void;
  isActive: boolean;
  editable: boolean;
}) {
  const cfg = EGG_CONFIG[type];
  const isPlanned = type === "planned";
  const isFailure = type === "failure";
  const isInteractive = !isPlanned || editable;

  const shapeClassName = `
    relative flex flex-col items-center justify-center gap-1
    w-full aspect-[3/4] border-2 select-none overflow-hidden
    ${cfg.bg} ${cfg.border} ${cfg.text}
    ${isActive ? "ring-2 ring-primary ring-offset-1" : ""}
    ${isPlanned ? "opacity-45" : ""}
    ${isInteractive ? "cursor-pointer" : "cursor-default"}
    ${isInteractive && isPlanned ? "hover:opacity-90" : ""}
    ${isInteractive && !isPlanned ? "hover:shadow-lg hover:shadow-black/10" : ""}
    transition-[opacity,box-shadow] duration-200
  `;

  const isImageIcon = cfg.icon.startsWith("/");

  const icon = isPlanned
    ? (editable && <span className="text-base leading-none z-10" aria-hidden="true">+</span>)
    : (!isFailure && (
        isImageIcon
          ? <img src={cfg.icon} alt="" className="w-3.5 h-3.5 z-10" aria-hidden="true" />
          : <span className="text-base leading-none z-10" aria-hidden="true">{cfg.icon}</span>
      ));

  if (!isInteractive) {
    return (
      <div className={shapeClassName} style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }} aria-hidden="true">
        <span className="text-[11px] font-bold leading-none z-10">{day}</span>
        {icon}
      </div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={shapeClassName}
      style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
      aria-label={`Day ${day}: ${isPlanned ? "기록 입력하기" : cfg.label}`}
    >
      <span className="text-[11px] font-bold leading-none z-10">{day}</span>
      {icon}
      {isFailure && <CrackedEggOverlay />}
    </motion.button>
  );
}
