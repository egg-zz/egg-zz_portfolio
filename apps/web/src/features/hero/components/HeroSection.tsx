"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ArrowDown, ExternalLink } from "lucide-react";
import { prefersReducedMotion } from "../../egg-tray/lib/prefers-reduced-motion";

const EGG_DATA = [
  { cx: 60, cy: 80, rx: 38, ry: 48, fill: "var(--egg-yolk-light)", opacity: 0.9, floatDelay: 0 },
  { cx: 130, cy: 55, rx: 28, ry: 36, fill: "var(--card)", opacity: 0.95, floatDelay: 0.4 },
  { cx: 185, cy: 90, rx: 32, ry: 42, fill: "var(--chart-3)", opacity: 0.85, floatDelay: 0.8 },
  { cx: 240, cy: 60, rx: 24, ry: 30, fill: "var(--chart-4)", opacity: 0.8, floatDelay: 1.2 },
  { cx: 290, cy: 88, rx: 35, ry: 44, fill: "var(--primary)", opacity: 0.7, floatDelay: 0.6 },
];

function FloatingEggs() {
  const eggRefs = useRef<(SVGEllipseElement | null)[]>([]);

  useEffect(() => {
    const eggs = eggRefs.current.filter((el): el is SVGEllipseElement => el !== null);
    if (eggs.length === 0) return;

    if (prefersReducedMotion()) {
      eggs.forEach((el, i) => gsap.set(el, { opacity: EGG_DATA[i].opacity, y: 0 }));
      return;
    }

    gsap.set(eggs, { y: 44, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.1 });
    eggs.forEach((el, i) => {
      tl.to(el, { y: 0, opacity: EGG_DATA[i].opacity, duration: 0.6, ease: "back.out(1.8)" }, i * 0.12);
    });
    eggs.forEach((el, i) => {
      tl.to(el, { y: -6, duration: 1.75, ease: "sine.inOut", repeat: -1, yoyo: true }, `+=${EGG_DATA[i].floatDelay}`);
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg viewBox="0 0 340 140" className="w-full max-w-sm" aria-hidden="true">
      {EGG_DATA.map((e, i) => (
        <ellipse
          key={i}
          ref={(el) => {
            eggRefs.current[i] = el;
          }}
          cx={e.cx}
          cy={e.cy}
          rx={e.rx}
          ry={e.ry}
          fill={e.fill}
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
  const eggsWrapRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [eggsWrapRef.current, kickerRef.current, titleRef.current, subtitleRef.current, ctaRef.current];
    if (targets.some((el) => el === null)) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(eggsWrapRef.current, { opacity: 0, scale: 0.9 });
    gsap.set([kickerRef.current, titleRef.current, subtitleRef.current], { opacity: 0, y: 16 });
    gsap.set(ctaRef.current, { opacity: 0, y: 14 });

    const tl = gsap
      .timeline()
      .to(eggsWrapRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0.1)
      .to(kickerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.5)
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.65)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.9)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.15);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center relative"
    >
      <div className="max-w-2xl mx-auto">
        <div ref={eggsWrapRef} className="mb-8">
          <FloatingEggs />
        </div>

        <p ref={kickerRef} className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-4">
          Frontend Developer · Kwon Surin
        </p>

        <h1 ref={titleRef} className="text-display sm:text-display-lg font-bold mb-6">
          아이디어가 서비스로{" "}
          <span className="italic text-primary">부화할 때까지</span>
          <br />개발합니다.
        </h1>

        <p ref={subtitleRef} className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
          아이디어를 빠르게 깨워 보고,
          <br />끝까지 다듬어 세상 밖으로 꺼내는 개발자 권수린입니다.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start justify-center gap-4">
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
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
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
