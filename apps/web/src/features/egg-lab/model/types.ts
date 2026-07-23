export type LabStatus = "concept" | "prototype" | "in-progress" | "completed";

export interface LabItem {
  title: string;
  desc: string;
  intent: string;
  aiUsed: string;
  myJudgement: string;
  tags: string[];
  status: LabStatus;
}
