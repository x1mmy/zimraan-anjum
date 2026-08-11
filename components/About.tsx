"use client";

import Image from "next/image";
import { useRef } from "react";
import { Eyebrow, TagList } from "./primitives";
import { about } from "@/lib/content";
import { clamp01, isNarrow, lerp, useScrollFrame } from "@/lib/motion";
import styles from "./About.module.css";

const words = about.heading.split(" ");

export function About() {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const zoom = useRef(0);

  useScrollFrame(() => {
    const vh = window.innerHeight;
    // Both effects below are desktop-only; the stylesheet pins the stacked
    // layout to the finished state, so there is nothing to drive here.
    if (isNarrow()) return;

    // Portrait eases out of a slight over-scale as it crosses the viewport.
    const frame = frameRef.current;
    const image = imageRef.current;
    if (frame && image) {
      const rect = frame.getBoundingClientRect();
      const target = clamp01((vh - rect.top) / (vh + rect.height));
      zoom.current = lerp(zoom.current, target, 0.1);
      const scale = 1.16 - zoom.current * 0.16;
      const shift = (0.5 - zoom.current) * 7;
      image.style.transform = `translate3d(0, ${shift.toFixed(2)}%, 0) scale(${scale.toFixed(4)})`;
    }

    // Heading lights up word by word as it rises through the viewport.
    const heading = headingRef.current;
    if (heading) {
      const rect = heading.getBoundingClientRect();
      const progress = clamp01((vh * 0.86 - rect.top) / (vh * 0.42));
      const lit = Math.round(progress * words.length);
      const spans = heading.querySelectorAll<HTMLElement>("[data-word]");
      spans.forEach((span, i) => {
        span.classList.toggle(styles.wordLit, i < lit);
      });
    }
  });

  return (
    <div className={styles.layout}>
      <div ref={frameRef} className={styles.portraitFrame}>
        <div ref={imageRef} className={styles.portraitInner}>
          <Image
            src="/images/zimraan.jpg"
            alt="Zimraan Anjum"
            width={1066}
            height={1600}
            className={styles.portrait}
            sizes="(max-width: 900px) 90vw, 40vw"
            priority
          />
        </div>
      </div>

      <div>
        <Eyebrow className={styles.eyebrow}>About</Eyebrow>
        <h2 ref={headingRef} className={styles.heading}>
          {words.map((word, i) => (
            <span key={`${word}-${i}`} data-word className={styles.word}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        {about.paragraphs.map((paragraph, i) => (
          <p key={i} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}

        <div className={styles.stack}>
          <TagList items={about.stack} />
        </div>
      </div>
    </div>
  );
}
