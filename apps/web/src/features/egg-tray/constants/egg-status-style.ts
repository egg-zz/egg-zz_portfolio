import type { EggType } from "../model/types";

export const EGG_STATUS_STYLE: Record<EggType, { label: string; bg: string; border: string; text: string; icon: string }> = {
  planned:  { label: "계획",        bg: "bg-muted",         border: "border-border",       text: "text-muted-foreground",  icon: "○" },
  learning: { label: "학습",        bg: "bg-background",    border: "border-egg-yolk-light", text: "text-primary",          icon: "📖" },
  feature:  { label: "기능 구현",   bg: "bg-egg-yolk-light", border: "border-accent",       text: "text-accent-foreground", icon: "</>" },
  bugfix:   { label: "문제 해결",   bg: "bg-chart-4",       border: "border-primary",      text: "text-primary-foreground", icon: "💡" },
  failure:  { label: "실패 & 개선", bg: "bg-primary",       border: "border-chart-5",      text: "text-primary-foreground", icon: "✕" },
  deployed: { label: "배포",        bg: "bg-muted",         border: "",                     text: "text-muted-foreground",  icon: "✓" },
};
