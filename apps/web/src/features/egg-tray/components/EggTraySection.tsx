import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EggEntry, EggType } from "../model/types";
import { EGG_CONFIG } from "../model/egg-config";
import { MONTHS, CURRENT_MONTH_INDEX } from "../data/months";
import { getStoredEntriesForMonth, saveStoredEntry } from "../lib/storage";
import { EggShape } from "./EggShape";
import { EggModal } from "./EggModal";
import { EggInputModal } from "./EggInputModal";

interface EggTraySectionProps {
  sectionRef: (el: HTMLElement | null) => void;
}

export function EggTraySection({ sectionRef }: EggTraySectionProps) {
  const [monthIdx, setMonthIdx] = useState(CURRENT_MONTH_INDEX);
  const [selectedEgg, setSelectedEgg] = useState<EggEntry | null>(null);
  const [inputEgg, setInputEgg] = useState<EggEntry | null>(null);
  const [overrides, setOverrides] = useState<Record<number, EggEntry>>({});

  const month = MONTHS[monthIdx];
  const canPrev = monthIdx > 0;
  const canNext = monthIdx < MONTHS.length - 1;

  useEffect(() => {
    setOverrides(getStoredEntriesForMonth(month.key));
  }, [month.key]);

  const eggs = month.eggs.map((egg) => overrides[egg.day] ?? egg);

  const handlePrev = () => {
    if (canPrev) {
      setMonthIdx(i => i - 1);
      setSelectedEgg(null);
      setInputEgg(null);
    }
  };

  const handleNext = () => {
    if (canNext) {
      setMonthIdx(i => i + 1);
      setSelectedEgg(null);
      setInputEgg(null);
    }
  };

  const handleSaveEntry = (entry: EggEntry) => {
    saveStoredEntry(month.key, entry.day, entry);
    setOverrides((prev) => ({ ...prev, [entry.day]: entry }));
    setInputEgg(null);
  };

  return (
    <section
      id="tray"
      ref={sectionRef}
      className="py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">
            {month.sprint} · Sprint
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-heading sm:text-heading-lg font-bold mb-3">계란 한 판 = 한 달</h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                30개의 계란이 이번 달의 개발 기록입니다. 채워진 계란을 클릭하면 그날의 문제와 판단, 해결 과정을 볼 수 있고, 빈 계란(+)을 클릭하면 직접 기록을 남길 수 있습니다.
              </p>
            </div>

            {/* Month Navigator */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handlePrev}
                disabled={!canPrev}
                className={`
                  w-9 h-9 rounded-full border border-border flex items-center justify-center transition-colors
                  ${canPrev
                    ? "hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground"
                    : "text-muted-foreground/30 cursor-not-allowed"
                  }
                `}
                aria-label="이전 달"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-center min-w-[120px]">
                <p className="text-sm font-semibold text-foreground">{month.korean}</p>
                <p className="text-[10px] text-muted-foreground">{month.label}</p>
              </div>

              <button
                onClick={handleNext}
                disabled={!canNext}
                className={`
                  w-9 h-9 rounded-full border border-border flex items-center justify-center transition-colors
                  ${canNext
                    ? "hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground"
                    : "text-muted-foreground/30 cursor-not-allowed"
                  }
                `}
                aria-label="다음 달"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(Object.entries(EGG_CONFIG) as [EggType, typeof EGG_CONFIG[EggType]][]).map(([type, cfg]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div
                className={`w-5 h-6 border-2 ${cfg.bg} ${cfg.border}`}
                style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
              />
              <span className="text-xs text-muted-foreground">{cfg.label}</span>
            </div>
          ))}
        </div>

        {/* Carton */}
        <motion.div
          key={month.key}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border-2 border-border p-5 sm:p-8"
          style={{ background: "linear-gradient(135deg, var(--tray-from) 0%, var(--tray-to) 100%)" }}
        >
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 sm:gap-4">
            {eggs.map((egg) => (
              <EggShape
                key={egg.day}
                type={egg.type}
                day={egg.day}
                isActive={selectedEgg?.day === egg.day || inputEgg?.day === egg.day}
                onClick={() => {
                  if (egg.type === "planned") setInputEgg(egg);
                  else setSelectedEgg(egg);
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { label: "기능 구현", count: eggs.filter(e => e.type === "feature").length,  color: "text-amber-600" },
            { label: "문제 해결", count: eggs.filter(e => e.type === "bugfix").length,   color: "text-orange-500" },
            { label: "배포",     count: eggs.filter(e => e.type === "deployed").length, color: "text-emerald-600" },
            { label: "실패·개선", count: eggs.filter(e => e.type === "failure").length,  color: "text-amber-700" },
          ].map(({ label, count, color }) => (
            <div key={label} className="bg-card border border-border rounded-xl px-4 py-3 text-center">
              <p className={`text-2xl font-bold ${color}`}>{count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedEgg && (
        <EggModal egg={selectedEgg} onClose={() => setSelectedEgg(null)} />
      )}

      {inputEgg && (
        <EggInputModal egg={inputEgg} onClose={() => setInputEgg(null)} onSave={handleSaveEntry} />
      )}
    </section>
  );
}
