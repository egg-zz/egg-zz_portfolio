import { useState } from "react";
import { motion } from "motion/react";
import { labItems } from "../data/lab-items";
import type { LabItem } from "../model/types";
import { LabCard } from "./LabCard";
import { LabItemModal } from "./LabItemModal";

interface EggLabSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
}

export function EggLabSection({ sectionRef }: EggLabSectionProps) {
  const [selected, setSelected] = useState<LabItem | null>(null);

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">Egg Lab</p>
          <h2 className="text-heading sm:text-heading-lg font-bold mb-4">아직 부화 중인 작은 실험들</h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg">
            거창하지 않아도 궁금하면 바로 만들어 봅니다.
            <br />AI를 어디에 사용했고, 무엇을 직접 판단했는지도 함께 기록했어요.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-3">
          {labItems.map((item, i) => (
            <LabCard
              key={item.title}
              item={item}
              index={i}
              onOpen={() => setSelected(item)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <LabItemModal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
