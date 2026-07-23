import type { EggType } from "./types";

export const EGG_CONFIG: Record<EggType, { label: string; bg: string; border: string; text: string; icon: string }> = {
  planned:  { label: "계획",        bg: "bg-stone-100",  border: "border-stone-200",  text: "text-stone-400",  icon: "○" },
  learning: { label: "학습",        bg: "bg-amber-50",   border: "border-amber-200",  text: "text-amber-600",  icon: "/book.svg" },
  feature:  { label: "기능 구현",   bg: "bg-amber-300",  border: "border-amber-400",  text: "text-amber-900",  icon: "/code.svg" },
  bugfix:   { label: "문제 해결",   bg: "bg-orange-400", border: "border-orange-500", text: "text-white",      icon: "/bulb.svg" },
  failure:  { label: "실패 & 개선", bg: "bg-amber-600",  border: "border-amber-700",  text: "text-amber-50",   icon: "✕" },
  deployed: { label: "배포",        bg: "bg-[#B8721A]",  border: "border-[#8A5614]",  text: "text-white",      icon: "✓" },
};
