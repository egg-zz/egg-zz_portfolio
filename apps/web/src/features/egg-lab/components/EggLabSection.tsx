import { motion } from "motion/react";
import { labItems } from "../data/lab-items";
import { LabCard } from "./LabCard";

interface EggLabSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
}

export function EggLabSection({ sectionRef }: EggLabSectionProps) {
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
          <h2 className="text-heading sm:text-heading-lg font-bold mb-4">작은 실험들</h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg">
            빠르게 아이디어를 실험하는 공간입니다. AI를 어디에 사용하고 내가 무엇을 직접 판단했는지 함께 기록합니다.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-3">
          {labItems.map((item, i) => (
            <LabCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
