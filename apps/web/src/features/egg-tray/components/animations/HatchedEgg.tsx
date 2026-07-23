import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../lib/prefers-reduced-motion";
import type { EggAnimationHandle } from "./types";

export const HatchedEgg = forwardRef<EggAnimationHandle, { day: number; hatched: boolean }>(({ day, hatched }, ref) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eggContentRef = useRef<HTMLDivElement>(null);
  const chickRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        if (prefersReducedMotion()) {
          gsap.set(eggContentRef.current, { opacity: 0, scale: 0.85 });
          gsap.set(chickRef.current, { opacity: 1, scale: 1 });
          gsap.set(liveRef.current, { opacity: 1 });
          return;
        }
        tlRef.current?.kill();
        tlRef.current = gsap
          .timeline()
          .to(wrapRef.current, { rotate: -7, duration: 0.07, ease: "power1.inOut" })
          .to(wrapRef.current, { rotate: 7, duration: 0.09, ease: "power1.inOut" })
          .to(wrapRef.current, { rotate: -5, duration: 0.08, ease: "power1.inOut" })
          .to(wrapRef.current, { rotate: 5, duration: 0.08, ease: "power1.inOut" })
          .to(wrapRef.current, { rotate: 0, duration: 0.13, ease: "power1.out" })
          .to(eggContentRef.current, { opacity: 0, scale: 0.85, duration: 0.15 }, "-=0.15")
          .fromTo(chickRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1.05, duration: 0.18, ease: "back.out(1.7)" }, "<")
          .to(chickRef.current, { scale: 1, duration: 0.1 })
          .to(liveRef.current, { opacity: 1, duration: 0.15 }, "-=0.05");
      },
      reverse: () => {
        // Once hatched by a click, it stays a chick until the page reloads.
        if (hatched) return;
        tlRef.current?.kill();
        tlRef.current = gsap
          .timeline()
          .to(liveRef.current, { opacity: 0, duration: 0.1 })
          .to(chickRef.current, { opacity: 0, scale: 0.7, duration: 0.15 }, "<")
          .to(eggContentRef.current, { opacity: 1, scale: 1, duration: 0.15 }, "<")
          .set(wrapRef.current, { rotate: 0 });
      },
    }),
    [hatched],
  );

  return (
    <div ref={wrapRef} className="relative w-full h-full flex items-center justify-center">
      <div ref={eggContentRef} className="absolute inset-0 flex items-center justify-center gap-1">
        <span className="text-[11px] font-bold leading-none">{day}</span>
        <span className="text-xs leading-none" aria-hidden="true">✓</span>
      </div>
      <div ref={chickRef} className="absolute inset-0 flex items-center justify-center text-2xl opacity-0" aria-hidden="true">
        🐣
      </div>
      <span
        ref={liveRef}
        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[7px] font-bold tracking-wide text-emerald-700 opacity-0"
        aria-hidden="true"
      >
        LIVE
      </span>
    </div>
  );
});

HatchedEgg.displayName = "HatchedEgg";
