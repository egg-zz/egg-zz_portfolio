import { useRef } from "react";
import { motion } from "motion/react";
import type { EggType } from "../model/types";
import { EGG_CONFIG } from "../model/egg-config";
import { withBasePath } from "../lib/asset-path";
import { CrackedEgg } from "./animations/CrackedEgg";
import { HatchedEgg } from "./animations/HatchedEgg";
import type {
  EggAnimationHandle,
  HatchAnimationHandle,
} from "./animations/types";

export function EggShape({
  type,
  day,
  onClick,
  isActive,
  editable,
}: {
  type: EggType;
  day: number;
  onClick: () => void;
  isActive: boolean;
  editable: boolean;
}) {
  const cfg = EGG_CONFIG[type];
  const isPlanned = type === "planned";
  const isFailure = type === "failure";
  const isDeployed = type === "deployed";
  const isInteractive = !isPlanned || editable;
  const crackRef = useRef<EggAnimationHandle>(null);
  const hatchRef = useRef<HatchAnimationHandle>(null);

  const shapeClassName = `
    relative flex flex-col items-center justify-center gap-1
    w-full aspect-[3/4] select-none overflow-hidden
    ${isDeployed ? "border-transparent" : "border-2"} ${isDeployed ? "bg-transparent" : cfg.bg} ${isDeployed ? "" : cfg.border} ${cfg.text}
    ${isActive ? "ring-2 ring-primary ring-offset-1" : ""}
    ${isPlanned ? "opacity-45" : ""}
    ${isInteractive ? "cursor-pointer" : "cursor-default"}
    ${isInteractive && isPlanned ? "hover:opacity-90" : ""}
    ${isInteractive && !isPlanned ? "hover:shadow-lg hover:shadow-black/10" : ""}
    transition-[opacity,box-shadow] duration-200
  `;

  const isImageIcon = cfg.icon.startsWith("/");

  const icon = isPlanned
    ? editable && (
        <span className="text-base leading-none z-10" aria-hidden="true">
          +
        </span>
      )
    : !isFailure &&
      (isImageIcon ? (
        <img
          src={withBasePath(cfg.icon)}
          alt=""
          className="w-5 h-5 z-10"
          aria-hidden="true"
        />
      ) : (
        <span className="text-base leading-none z-10" aria-hidden="true">
          {cfg.icon}
        </span>
      ));

  if (!isInteractive) {
    return (
      <div
        className={shapeClassName}
        style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
        aria-hidden="true"
      >
        <span className="text-[11px] font-bold leading-none z-10">{day}</span>
        {icon}
      </div>
    );
  }

  return (
    <motion.button
      onClick={() => {
        onClick();
        if (isDeployed) hatchRef.current?.lock();
      }}
      onHoverStart={() => {
        crackRef.current?.play();
        hatchRef.current?.play();
      }}
      onHoverEnd={() => {
        crackRef.current?.reverse();
        hatchRef.current?.reverse();
      }}
      whileHover={{ y: -5, scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={shapeClassName}
      style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
      aria-label={`Day ${day}: ${isPlanned ? "기록 입력하기" : cfg.label}`}
    >
      {isDeployed ? (
        <HatchedEgg ref={hatchRef} day={day} />
      ) : (
        <>
          <span className="text-[11px] font-bold leading-none z-10">{day}</span>
          {icon}
          {isFailure && <CrackedEgg ref={crackRef} />}
        </>
      )}
    </motion.button>
  );
}
