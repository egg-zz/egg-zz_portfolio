import { motion } from "motion/react";
import { ArrowDown, ExternalLink } from "lucide-react";

function FloatingEggs() {
  const eggData = [
    { cx: 60,  cy: 80, rx: 38, ry: 48, fill: "var(--egg-yolk-light)", opacity: 0.9,  delay: 0 },
    { cx: 130, cy: 55, rx: 28, ry: 36, fill: "var(--card)", opacity: 0.95, delay: 0.4 },
    { cx: 185, cy: 90, rx: 32, ry: 42, fill: "var(--secondary)", opacity: 0.85, delay: 0.8 },
    { cx: 240, cy: 60, rx: 24, ry: 30, fill: "var(--point)", opacity: 0.8,  delay: 1.2 },
    { cx: 290, cy: 88, rx: 35, ry: 44, fill: "var(--primary)", opacity: 0.7,  delay: 0.6 },
  ];

  return (
    <svg viewBox="0 0 340 140" className="w-full max-w-sm" aria-hidden="true">
      {eggData.map((e, i) => (
        <motion.ellipse
          key={i}
          cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry}
          fill={e.fill} opacity={e.opacity}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, delay: e.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }}
        />
      ))}
    </svg>
  );
}

interface HeroSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
  onScrollToTray: () => void;
  onScrollToProjects: () => void;
}

export function HeroSection({ sectionRef, onScrollToTray, onScrollToProjects }: HeroSectionProps) {
  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8"
        >
          <FloatingEggs />
        </motion.div>

        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
          Frontend Developer · Kwon Surin
        </p>

        <h1 className="text-display sm:text-display-lg font-bold mb-6">
          아이디어가 서비스로{" "}
          <span className="italic text-primary">부화할 때까지</span>
          <br />개발합니다.
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
          아이디어를 빠르게 깨워 보고,
          <br />끝까지 다듬어 세상 밖으로 꺼내는 개발자 권수린입니다.
        </p>

        <div className="flex flex-col sm:flex-row items-start justify-center gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <motion.button
              onClick={onScrollToTray}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:bg-accent transition-colors"
            >
              <ArrowDown className="w-4 h-4" />
              오늘은 뭐가 부화했을까요?
            </motion.button>
            <span className="text-[11px] text-muted-foreground">이달의 개발 기록, 계란판으로 보기</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <motion.button
              onClick={onScrollToProjects}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-full font-semibold text-sm hover:bg-muted transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              부화한 프로젝트 구경하기
            </motion.button>
            <span className="text-[11px] text-muted-foreground">대표 프로젝트 살펴보기</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted-foreground/60"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
