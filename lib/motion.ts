"use client";

import { useEffect, useRef } from "react";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Runs `callback` on a single rAF loop, but only while the page is actually
 * scrolling (plus a short settle window so eased values land). One loop shared
 * per hook call beats a permanently-spinning rAF per animated element.
 */
export function useScrollFrame(callback: () => void, enabled = true) {
  const cb = useRef(callback);

  // Kept in an effect rather than assigned during render: the rAF loop below
  // only ever reads it after commit, and mutating a ref mid-render is exactly
  // the pattern React's compiler warns about.
  useEffect(() => {
    cb.current = callback;
  });

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;

    let frame = 0;
    let settleUntil = 0;

    const tick = () => {
      cb.current();
      if (performance.now() < settleUntil) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const kick = () => {
      // Keep easing for 400ms past the last scroll event so lerped transforms
      // finish rather than freezing part-way.
      settleUntil = performance.now() + 400;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });

    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);
}

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** True on the layouts where the design drops to a single column. */
export function isNarrow() {
  return typeof window !== "undefined" && window.innerWidth < 900;
}
