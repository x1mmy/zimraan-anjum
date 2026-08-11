"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/lib/content";
import { clamp01 } from "@/lib/motion";
import styles from "./Journey.module.css";

/** Where in the viewport a timeline entry counts as "reached". */
const ACTIVATION_POINT = 0.62;

/**
 * The timeline. As you scroll, the accent rail fills, dots light up, and the
 * sticky panel on the left names the stage you are currently level with.
 */
export function Journey() {
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const [fillPct, setFillPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * ACTIVATION_POINT;

      let reached = -1;
      itemRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) reached = i;
      });
      setActive(reached);

      const rail = railRef.current;
      if (rail) {
        const rect = rail.getBoundingClientRect();
        setFillPct(clamp01((line - rect.top) / Math.max(1, rect.height)) * 100);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const current = journey[Math.max(0, active)];

  return (
    <div className={styles.layout}>
      <div className={styles.sticky} aria-hidden="true">
        <div className={styles.stickyLabel}>Now</div>
        <div className={styles.stickyRole}>{current.role}</div>
        <div className={styles.stickyOrg}>{current.org}</div>
      </div>

      <div ref={railRef} className={styles.rail}>
        <span className={styles.railTrack} aria-hidden="true" />
        <span
          className={styles.railFill}
          style={{ height: `${fillPct.toFixed(1)}%` }}
          aria-hidden="true"
        />

        <ol className={styles.list}>
          {journey.map((step, i) => (
            <li
              key={`${step.org}-${step.date}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={[styles.item, i <= active ? styles.itemActive : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.date}>{step.date}</div>
              <h3 className={styles.role}>{step.role}</h3>
              <div className={styles.org}>{step.org}</div>
              <p className={styles.note}>{step.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
