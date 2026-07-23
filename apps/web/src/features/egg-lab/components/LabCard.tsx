import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { LabItem } from "../model/types";

export function LabCard({ item, index }: { item: LabItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border border-border rounded-xl bg-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {item.tags.map(t => (
            <span key={t} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{t}</span>
          ))}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-border">
              <div className="pt-3 space-y-3">
                {[
                  { label: "무엇을 확인하고 싶었는가", content: item.intent },
                  { label: "AI를 어디에 사용했는가", content: item.aiUsed },
                  { label: "내가 직접 판단하고 수정한 부분", content: item.myJudgement },
                ].map(({ label, content }) => (
                  <div key={label}>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-xs leading-relaxed text-foreground/85">{content}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
