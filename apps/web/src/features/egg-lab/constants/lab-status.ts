import type { LabStatus } from "../model/types";

export const LAB_STATUS_STYLE: Record<LabStatus, { friendly: string; formal: string; chipClass: string }> = {
  concept:     { friendly: "방금 낳은 아이디어", formal: "Concept",     chipClass: "bg-stone-100 text-stone-500 border-stone-200" },
  prototype:   { friendly: "부화 중",           formal: "Prototype",   chipClass: "bg-amber-50 text-amber-700 border-amber-200" },
  "in-progress": { friendly: "다시 품는 중",     formal: "In Progress", chipClass: "bg-amber-100 text-amber-800 border-amber-300" },
  completed:   { friendly: "실험 완료",          formal: "Completed",   chipClass: "bg-primary text-primary-foreground border-primary" },
};
