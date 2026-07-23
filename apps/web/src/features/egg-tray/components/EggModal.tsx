import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import type { EggEntry } from "../model/types";
import { EGG_CONFIG } from "../model/egg-config";

export function EggModal({ egg, onClose }: { egg: EggEntry; onClose: () => void }) {
  const cfg = EGG_CONFIG[egg.type];

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
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                    {cfg.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{egg.date}</span>
                </div>
                <h3 className="text-xl font-semibold">{egg.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cfg.flavor}</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: "문제", content: egg.problem },
                { label: "판단", content: egg.decision },
                { label: "해결", content: egg.solution },
                { label: "배운 점", content: egg.learned },
              ].map(({ label, content }) => (
                <div key={label}>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm leading-relaxed text-foreground/90">{content}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
