import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import type { LabItem } from "../model/types";
import { LAB_STATUS_STYLE } from "../constants/lab-status";

export function LabCard({
  item,
  index,
  onOpen,
}: {
  item: LabItem;
  index: number;
  onOpen: () => void;
}) {
  const status = LAB_STATUS_STYLE[item.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border border-border rounded-xl bg-card overflow-hidden"
    >
      <button
        onClick={onOpen}
        className="w-full text-left p-4 hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
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
            <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </button>
    </motion.div>
  );
}
