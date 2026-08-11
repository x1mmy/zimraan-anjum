"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import styles from "./Reveal.module.css";

/**
 * Entrance: 18px rise out of a soft blur, once, when the element reaches the
 * lower edge of the viewport. Reduced-motion visitors get the content already in
 * place, and anything still hidden after the observer fires is force-shown by
 * the safety timeout so content can never be stranded invisible.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  /** Stagger index — multiplied by 80ms. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Reduced motion needs no JS at all — the stylesheet's reduced-motion block
    // already pins the revealed state, so we simply never observe.
    if (prefersReducedMotion()) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(el);

    // Belt and braces: if the observer never fires (element already past the
    // threshold on a restored scroll position, say) reveal it anyway.
    const safety = window.setTimeout(() => setShown(true), 1600);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <Tag
      // The union of element types above all accept a plain HTMLElement ref.
      ref={ref as never}
      id={id}
      className={[styles.reveal, shown ? styles.shown : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
      style={{ transitionDelay: `${delay * 80}ms` }}
    >
      {children}
    </Tag>
  );
}
