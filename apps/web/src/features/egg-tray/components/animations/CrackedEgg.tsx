import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../lib/prefers-reduced-motion";
import type { EggAnimationHandle } from "./types";

function setupDashLine(el: SVGPathElement | null) {
  if (!el) return 0;
  const length = el.getTotalLength();
  gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
  return length;
}

export const CrackedEgg = forwardRef<EggAnimationHandle>((_props, ref) => {
  const extTopRef = useRef<SVGPathElement>(null);
  const extBottomRef = useRef<SVGPathElement>(null);
  const branch1Ref = useRef<SVGPathElement>(null);
  const branch2Ref = useRef<SVGPathElement>(null);
  const branch3Ref = useRef<SVGPathElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const readyRef = useRef(false);

  const ensureSetup = () => {
    if (readyRef.current) return;
    setupDashLine(extTopRef.current);
    setupDashLine(extBottomRef.current);
    setupDashLine(branch1Ref.current);
    setupDashLine(branch2Ref.current);
    setupDashLine(branch3Ref.current);
    readyRef.current = true;
  };

  // Hide the hover-only lines immediately on mount — without this they flash
  // fully visible until the first hover lazily sets their dash offsets.
  useEffect(() => {
    ensureSetup();
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      ensureSetup();
      const targets = [extTopRef.current, extBottomRef.current, branch1Ref.current, branch2Ref.current, branch3Ref.current];
      if (prefersReducedMotion()) {
        targets.forEach((el) => el && gsap.set(el, { strokeDashoffset: 0 }));
        return;
      }
      tlRef.current?.kill();
      tlRef.current = gsap
        .timeline()
        .to([extTopRef.current, extBottomRef.current], { strokeDashoffset: 0, duration: 0.15, ease: "power1.out" }, 0)
        .to(branch1Ref.current, { strokeDashoffset: 0, duration: 0.12, ease: "power1.out" }, 0.1)
        .to(branch2Ref.current, { strokeDashoffset: 0, duration: 0.12, ease: "power1.out" }, 0.16)
        .to(branch3Ref.current, { strokeDashoffset: 0, duration: 0.12, ease: "power1.out" }, 0.22);
    },
    reverse: () => {
      ensureSetup();
      const targets = [extTopRef.current, extBottomRef.current, branch1Ref.current, branch2Ref.current, branch3Ref.current];
      tlRef.current?.kill();
      tlRef.current = gsap.timeline().to(targets, {
        strokeDashoffset: (i, target: SVGPathElement) => target.getTotalLength(),
        duration: 0.18,
        ease: "power1.in",
      });
    },
  }));

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 60 80"
      fill="none"
      aria-hidden="true"
    >
      {/* Main crack — always visible, single line */}
      <path
        d="M30 18 L26 30 L32 37 L27 52 L29 62"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Hover only: main crack extends a little further */}
      <path ref={extTopRef} d="M30 18 L33 9" stroke="rgba(0,0,0,0.3)" strokeWidth="1.8" strokeLinecap="round" />
      <path ref={extBottomRef} d="M29 62 L26 71" stroke="rgba(0,0,0,0.3)" strokeWidth="1.8" strokeLinecap="round" />
      {/* Hover only: three branch cracks, drawn in with stagger */}
      <path ref={branch1Ref} d="M26 30 L19 35" stroke="rgba(0,0,0,0.25)" strokeWidth="1.4" strokeLinecap="round" />
      <path ref={branch2Ref} d="M32 37 L40 41" stroke="rgba(0,0,0,0.22)" strokeWidth="1.3" strokeLinecap="round" />
      <path ref={branch3Ref} d="M27 52 L21 58" stroke="rgba(0,0,0,0.25)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
});

CrackedEgg.displayName = "CrackedEgg";
