import type { EggType } from "../model/types";
import { EGG_STATUS_STYLE } from "../constants/egg-status-style";

export function EggContent({ type, day, editable }: { type: EggType; day: number; editable: boolean }) {
  const style = EGG_STATUS_STYLE[type];
  const isPlanned = type === "planned";
  const isFailure = type === "failure";

  const icon = isPlanned
    ? (editable && <span className="text-base leading-none z-10" aria-hidden="true">+</span>)
    : (!isFailure && <span className="text-base leading-none z-10" aria-hidden="true">{style.icon}</span>);

  return (
    <>
      <span className="text-[11px] font-bold leading-none z-10">{day}</span>
      {icon}
    </>
  );
}
