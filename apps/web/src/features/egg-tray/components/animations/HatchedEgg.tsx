import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../lib/prefers-reduced-motion";
import { withBasePath } from "../../lib/asset-path";
import type { HatchAnimationHandle } from "./types";

/* Zigzag crack across the shell, drawn just before it reveals the hatched art beneath. */
const SEAM = "6,32 16,27 24,35 32,28 40,35 48,28 54,32";

/* The source art has transparent padding around the shell; zoom+crop past it so
   nothing but the illustration itself is visible once hatched. */
const IMG_SCALE = 1.35;

export const HatchedEgg = forwardRef<HatchAnimationHandle, { day: number }>(({ day }, ref) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const eggLayerRef = useRef<HTMLDivElement>(null);
  const crackRef = useRef<SVGPolylineElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hatchedRef = useRef(false);
  const readyRef = useRef(false);

  const ensureSetup = () => {
    if (readyRef.current) return;
    gsap.set(imgRef.current, { y: 16, scale: IMG_SCALE * 0.85, opacity: 0 });
    const len = crackRef.current?.getTotalLength() ?? 0;
    gsap.set(crackRef.current, { strokeDasharray: len, strokeDashoffset: len });
    readyRef.current = true;
  };

  // Hide the crack immediately on mount — without this it's drawn fully
  // visible until the first hover lazily sets its dash offset.
  useEffect(() => {
    ensureSetup();
  }, []);

  const runHatch = () => {
    ensureSetup();
    tlRef.current?.kill();

    if (prefersReducedMotion()) {
      gsap.set(imgRef.current, { y: 0, scale: IMG_SCALE, opacity: 1 });
      gsap.set(eggLayerRef.current, { opacity: 0 });
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
      .to(imgRef.current, { y: 0, scale: IMG_SCALE * 1.05, opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.05")
      .to(eggLayerRef.current, { opacity: 0, duration: 0.2 }, "<")
      .to(imgRef.current, { scale: IMG_SCALE, duration: 0.12 });
  };

  const runUnhatch = () => {
    ensureSetup();
    tlRef.current?.kill();
    const len = crackRef.current?.getTotalLength() ?? 0;

    tlRef.current = gsap
      .timeline()
      .to(imgRef.current, { y: 16, scale: IMG_SCALE * 0.85, opacity: 0, duration: 0.15, ease: "power1.in" })
      .to(eggLayerRef.current, { opacity: 1, duration: 0.15 }, "<")
      .to(crackRef.current, { strokeDashoffset: len, duration: 0.15 }, "<")
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
    <div ref={wrapRef} className="relative w-full h-full">
      <div ref={eggLayerRef} className="absolute inset-0" style={{ background: "#B8721A" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 60 80" aria-hidden="true">
          <polyline ref={crackRef} points={SEAM} fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
        </svg>
        <div ref={labelRef} className="absolute inset-0 flex items-center justify-center gap-1 z-10 text-white">
          <span className="text-[11px] font-bold leading-none">{day}</span>
          <span className="text-base leading-none" aria-hidden="true">✓</span>
        </div>
      </div>
      <img
        ref={imgRef}
        src={withBasePath("/egg-hatched-no-top-shell.svg?v=2")}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[50%_82%] opacity-0"
        aria-hidden="true"
      />
    </div>
  );
});

HatchedEgg.displayName = "HatchedEgg";
