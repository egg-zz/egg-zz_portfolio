import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import type { EggEntry, EggType } from "../model/types";
import { EGG_CONFIG } from "../model/egg-config";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { cn } from "../../../components/ui/utils";

const SELECTABLE_TYPES = (Object.keys(EGG_CONFIG) as EggType[]).filter(
  (type) => type !== "planned",
);

const FIELDS: { key: "problem" | "decision" | "solution" | "learned"; label: string; placeholder: string }[] = [
  { key: "problem", label: "문제", placeholder: "어떤 문제를 마주쳤나요?" },
  { key: "decision", label: "판단", placeholder: "어떻게 판단하고 방향을 잡았나요?" },
  { key: "solution", label: "해결", placeholder: "실제로 어떻게 해결했나요?" },
  { key: "learned", label: "배운 점", placeholder: "이 경험에서 무엇을 배웠나요?" },
];

export function EggInputModal({
  egg,
  onClose,
  onSave,
}: {
  egg: EggEntry;
  onClose: () => void;
  onSave: (entry: EggEntry) => void;
}) {
  const [type, setType] = useState<EggType>(SELECTABLE_TYPES[0]);
  const [title, setTitle] = useState(egg.title);
  const [problem, setProblem] = useState(egg.problem);
  const [decision, setDecision] = useState(egg.decision);
  const [solution, setSolution] = useState(egg.solution);
  const [learned, setLearned] = useState(egg.learned);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const values = { problem, decision, solution, learned };
  const setters = { problem: setProblem, decision: setDecision, solution: setSolution, learned: setLearned };

  const canSave = title.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSave({ ...egg, type, title, problem, decision, solution, learned });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.div
          className="relative z-10 bg-background border border-border rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">{egg.date} · 기록 남기기</p>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="오늘의 제목"
                  className="text-xl font-semibold h-auto px-0 border-0 bg-transparent focus-visible:ring-0 shadow-none"
                />
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">태그</p>
              <div className="flex flex-wrap gap-2">
                {SELECTABLE_TYPES.map((t) => {
                  const cfg = EGG_CONFIG[t];
                  const active = type === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors",
                        active ? `${cfg.bg} ${cfg.border} ${cfg.text}` : "bg-transparent border-border text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              {FIELDS.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                  <Textarea
                    value={values[key]}
                    onChange={(e) => setters[key](e.target.value)}
                    placeholder={placeholder}
                    className="text-sm min-h-20"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={onClose}
                className="text-xs font-semibold px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={!canSave}
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 disabled:pointer-events-none"
              >
                저장
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
