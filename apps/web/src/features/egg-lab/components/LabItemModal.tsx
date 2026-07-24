import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import type { LabItem } from "../model/types";
import { LAB_STATUS_STYLE } from "../constants/lab-status";

export function LabItemModal({
  item,
  onClose,
}: {
  item: LabItem;
  onClose: () => void;
}) {
  const status = LAB_STATUS_STYLE[item.status];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm border ${status.chipClass}`}
                  >
                    {status.friendly}
                  </span>
                  <span className="text-[9px] font-mono font-medium uppercase tracking-wider px-1.5 py-0.5 rounded border border-border text-muted-foreground">
                    {status.formal}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.desc}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1 mb-5">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              {[
                { label: "어떤 게 궁금했을까요?", content: item.intent },
                {
                  label: "AI에게 어떤 도움을 받았을까요",
                  content: item.aiUsed,
                },
                {
                  label: "제가 직접 고민하고 다듬은 부분이에요",
                  content: item.myJudgement,
                },
              ].map(({ label, content }) => (
                <div key={label}>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {label}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
