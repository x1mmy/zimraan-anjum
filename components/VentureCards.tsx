"use client";

import { useRef } from "react";
import { Icon } from "./Icon";
import { TagList } from "./primitives";
import { Reveal } from "./Reveal";
import { ventures } from "@/lib/content";
import { clamp01, isNarrow, useScrollFrame } from "@/lib/motion";
import styles from "./sections.module.css";

/** Depth per card, so the pair drifts apart slightly as it passes the viewport. */
const DEPTHS = [-22, 22];

export function VentureCards() {
  const driftRefs = useRef<(HTMLDivElement | null)[]>([]);

  useScrollFrame(() => {
    const vh = window.innerHeight;
    const narrow = isNarrow();

    driftRefs.current.forEach((el, i) => {
      if (!el) return;
      if (narrow) {
        el.style.transform = "";
        return;
      }
      const rect = el.getBoundingClientRect();
      const p = clamp01((vh - rect.top) / (vh + rect.height)) - 0.5;
      el.style.transform = `translate3d(0, ${(p * DEPTHS[i % DEPTHS.length]).toFixed(2)}px, 0)`;
    });
  });

  return (
    <div className={styles.ventures}>
      {ventures.map((venture, i) => (
        <Reveal key={venture.name} delay={i}>
          <div
            ref={(el) => {
              driftRefs.current[i] = el;
            }}
            className={styles.ventureDrift}
          >
            <a
              href={venture.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.venture}
            >
              <div className={styles.ventureLabel}>{venture.eyebrow}</div>
              <h3 className={styles.ventureName}>
                {venture.name}
                <span className={styles.ventureArrow}>
                  <Icon name="arrow-up-right" size={16} />
                </span>
              </h3>
              <p className={styles.ventureBody}>{venture.body}</p>
              <div
                className={`${styles.ventureTags} ${styles.ventureTagSpacer}`}
              >
                <TagList items={venture.tags} />
              </div>
              <div className={styles.ventureDomain}>{venture.display}</div>
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
