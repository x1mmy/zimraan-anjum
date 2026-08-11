"use client";

import { useRef } from "react";
import { useScrollFrame } from "@/lib/motion";
import styles from "./ReadingProgress.module.css";

/** Hairline accent bar across the top of the viewport tracking scroll depth. */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    el.style.width = `${pct.toFixed(2)}%`;
  });

  return <div ref={ref} className={styles.bar} aria-hidden="true" />;
}
