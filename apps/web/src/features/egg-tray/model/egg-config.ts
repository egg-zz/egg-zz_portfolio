import type { EggType } from "./types";

export const EGG_CONFIG: Record<EggType, { label: string; bg: string; border: string; text: string; icon: string; flavor: string }> = {
  planned:  { label: "계획",        bg: "bg-stone-100",  border: "border-stone-200",  text: "text-stone-400",  icon: "○", flavor: "오늘은 무엇을 만들지 차근차근 품어 봤어요." },
  learning: { label: "학습",        bg: "bg-amber-50",   border: "border-amber-200",  text: "text-amber-600",  icon: "/book.svg", flavor: "새로운 지식을 하나 더 알차게 채웠어요." },
  feature:  { label: "기능 구현",   bg: "bg-amber-300",  border: "border-amber-400",  text: "text-amber-900",  icon: "/code.svg", flavor: "아이디어 하나를 실제 기능으로 만들어 냈어요." },
  bugfix:   { label: "문제 해결",   bg: "bg-orange-400", border: "border-orange-500", text: "text-white",      icon: "/bulb.svg", flavor: "막혔던 문제를 풀고 다시 앞으로 나아갔어요." },
  failure:  { label: "실패 & 개선", bg: "bg-amber-600",  border: "border-amber-700",  text: "text-amber-50",   icon: "✕", flavor: "한 번 깨졌지만, 더 단단하게 다시 만들었어요." },
  deployed: { label: "배포",        bg: "bg-[#B8721A]",  border: "border-[#8A5614]",  text: "text-white",      icon: "✓", flavor: "정성껏 만든 결과물이 드디어 세상 밖으로 나왔어요." },
};
