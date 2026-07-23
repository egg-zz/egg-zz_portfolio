export type EggType = "planned" | "learning" | "feature" | "bugfix" | "failure" | "deployed";

export interface EggEntry {
  day: number;
  date: string;
  type: EggType;
  title: string;
  problem: string;
  decision: string;
  solution: string;
  learned: string;
}

export interface MonthData {
  key: string;
  label: string;
  korean: string;
  sprint: string;
  eggs: EggEntry[];
}
