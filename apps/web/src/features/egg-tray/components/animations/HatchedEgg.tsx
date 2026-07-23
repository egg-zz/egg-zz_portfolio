import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../lib/prefers-reduced-motion";
import type { HatchAnimationHandle } from "./types";
import { Chick } from "./Chick";

const SHELL_FILL = "var(--card)";
const SHELL_STROKE = "#D9C79E";

/* Jagged seam the shell splits along, top → bottom */
const SEAM = "30,0 26,10 34,20 27,30 33,40 29,54";
const SHELL_LEFT_POINTS = "0,0 0,54 29,54 33,40 27,30 34,20 26,10 30,0";
const SHELL_RIGHT_POINTS = "60,0 60,54 31,54 27,40 33,30 26,20 34,10 30,0";

export const HatchedEgg = forwardRef<HatchAnimationHandle, { day: number }>(({ day }, ref) => {
  const wrapRef = useRef<SVGGElement>(null);
  const chickRef = useRef<SVGGElement>(null);
  const shellLeftRef = useRef<SVGPolygonElement>(null);
  const shellRightRef = useRef<SVGPolygonElement>(null);
  const crackRef = useRef<SVGPolylineElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hatchedRef = useRef(false);
  const readyRef = useRef(false);

  const ensureSetup = () => {
    if (readyRef.current) return;
    gsap.set(shellLeftRef.current, { transformOrigin: "0% 50%" });
    gsap.set(shellRightRef.current, { transformOrigin: "100% 50%" });
    gsap.set(chickRef.current, { transformOrigin: "50% 100%", y: 16, scale: 0.85, opacity: 0 });
    const len = crackRef.current?.getTotalLength() ?? 0;
    gsap.set(crackRef.current, { strokeDasharray: len, strokeDashoffset: len });
    readyRef.current = true;
  };

  const runHatch = () => {
    ensureSetup();
    tlRef.current?.kill();

    if (prefersReducedMotion()) {
      gsap.set(shellLeftRef.current, { x: -5, rotate: -10 });
      gsap.set(shellRightRef.current, { x: 5, rotate: 10 });
      gsap.set(crackRef.current, { strokeDashoffset: 0 });
      gsap.set(chickRef.current, { y: 0, scale: 1, opacity: 1 });
      gsap.set(labelRef.current, { opacity: 0 });
      return;
    }

    tlRef.current = gsap
      .timeline()
      .to(wrapRef.current, { rotate: -6, duration: 0.05, ease: "power1.inOut" })
      .to(wrapRef.current, { rotate: 6, duration: 0.06, ease: "power1.inOut" })
      .to(wrapRef.current, { rotate: -4, duration: 0.05, ease: "power1.inOut" })
      .to(wrapRef.current, { rotate: 4, duration: 0.05, ease: "power1.inOut" })
      .to(wrapRef.current, { rotate: 0, duration: 0.06, ease: "power1.out" })
      .to(crackRef.current, { strokeDashoffset: 0, duration: 0.15, ease: "power1.out" }, "-=0.1")
      .to(shellLeftRef.current, { x: -5, rotate: -10, duration: 0.2, ease: "power2.out" }, "-=0.02")
      .to(shellRightRef.current, { x: 5, rotate: 10, duration: 0.2, ease: "power2.out" }, "<")
      .to(labelRef.current, { opacity: 0, duration: 0.15 }, "<")
      .to(chickRef.current, { y: 0, scale: 1.03, opacity: 1, duration: 0.2, ease: "power2.out" }, "-=0.12")
      .to(chickRef.current, { scale: 1, duration: 0.1 });
  };

  const runUnhatch = () => {
    ensureSetup();
    tlRef.current?.kill();
    const len = crackRef.current?.getTotalLength() ?? 0;

    tlRef.current = gsap
      .timeline()
      .to(chickRef.current, { y: 16, scale: 0.85, opacity: 0, duration: 0.15, ease: "power1.in" })
      .to(shellLeftRef.current, { x: 0, rotate: 0, duration: 0.15, ease: "power1.inOut" }, "<")
      .to(shellRightRef.current, { x: 0, rotate: 0, duration: 0.15, ease: "power1.inOut" }, "<")
      .to(crackRef.current, { strokeDashoffset: len, duration: 0.15 }, "<")
      .to(labelRef.current, { opacity: 1, duration: 0.15 }, "<")
      .set(wrapRef.current, { rotate: 0 });
  };

  useImperativeHandle(ref, () => ({
    play: () => {
      if (!hatchedRef.current) runHatch();
    },
    reverse: () => {
      if (!hatchedRef.current) runUnhatch();
    },
    lock: () => {
      if (hatchedRef.current) return;
      hatchedRef.current = true;
      runHatch();
    },
  }));

  return (
    <div className="relative w-full h-full">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 60 80" aria-hidden="true">
        <g ref={wrapRef} style={{ transformOrigin: "50% 50%" }}>
          <g ref={chickRef}>
            <Chick />
          </g>
          <polygon ref={shellLeftRef} points={SHELL_LEFT_POINTS} fill={SHELL_FILL} stroke={SHELL_STROKE} strokeWidth="1" />
          <polygon ref={shellRightRef} points={SHELL_RIGHT_POINTS} fill={SHELL_FILL} stroke={SHELL_STROKE} strokeWidth="1" />
          <rect x="0" y="54" width="60" height="26" fill={SHELL_FILL} stroke={SHELL_STROKE} strokeWidth="1" />
          <polyline ref={crackRef} points={SEAM} fill="none" stroke="var(--foreground)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        </g>
      </svg>
      <div ref={labelRef} className="absolute inset-0 flex items-center justify-center gap-1 z-10">
        <span className="text-[11px] font-bold leading-none">{day}</span>
        <span className="text-base leading-none" aria-hidden="true">✓</span>
      </div>
    </div>
  );
});

HatchedEgg.displayName = "HatchedEgg";
