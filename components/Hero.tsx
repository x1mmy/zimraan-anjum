"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Button } from "./Button";
import { Eyebrow, StatRow } from "./primitives";
import { facts, hero } from "@/lib/content";
import { contact } from "@/lib/contact";
import {
  clamp01,
  isNarrow,
  lerp,
  prefersReducedMotion,
  useScrollFrame,
} from "@/lib/motion";
import styles from "./Hero.module.css";

/**
 * Types the headline out once on first load, then leaves it alone.
 *
 * Written straight to the DOM rather than through state: the headline is ~50
 * characters, so a state-driven version would re-render the hero 50 times to
 * animate text that nothing else depends on. The server still renders the
 * finished string, so no-JS and reduced-motion visitors read it as normal.
 */
function useTypewriter(
  full: string,
  textRef: RefObject<HTMLSpanElement | null>,
  caretRef: RefObject<HTMLSpanElement | null>,
) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const el = textRef.current;
    if (!el) return;
    const caret = caretRef.current;

    let i = 0;
    let caretTimer = 0;
    el.textContent = "";
    if (caret) caret.style.opacity = "1";

    const interval = window.setInterval(() => {
      i += 1;
      el.textContent = full.slice(0, i);
      if (i >= full.length) {
        window.clearInterval(interval);
        // Let the caret blink a moment on the finished line, then retire it.
        caretTimer = window.setTimeout(() => {
          if (caret) caret.style.opacity = "0";
        }, 1800);
      }
    }, 34);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(caretTimer);
      // If we unmount mid-type, leave the full line behind rather than a stub.
      el.textContent = full;
      if (caret) caret.style.opacity = "0";
    };
  }, [full, textRef, caretRef]);
}

export function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  useTypewriter(hero.heading, typedRef, caretRef);

  const textRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const eased = useRef(0);

  // Hero lifts and fades as the page scrolls past it. Desktop only — on a phone
  // the hero is most of the first screen and fading it just looks broken.
  useScrollFrame(() => {
    const text = textRef.current;
    const actions = actionsRef.current;
    if (!text || !actions) return;

    if (isNarrow()) {
      text.style.transform = "";
      text.style.opacity = "";
      actions.style.transform = "";
      actions.style.opacity = "";
      return;
    }

    const target = clamp01(window.scrollY / (window.innerHeight * 0.85));
    eased.current = lerp(eased.current, target, 0.12);
    const p = eased.current;

    text.style.transform = `translate3d(0, ${(p * -64).toFixed(2)}px, 0) scale(${(1 - p * 0.035).toFixed(4)})`;
    text.style.opacity = (1 - p * 0.75).toFixed(3);
    actions.style.transform = `translate3d(0, ${(p * -28).toFixed(2)}px, 0)`;
    actions.style.opacity = (1 - p * 0.85).toFixed(3);
  });

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div ref={textRef} className={styles.top}>
        <div>
          <Eyebrow className={styles.eyebrow}>{hero.location}</Eyebrow>
          <h1 id="hero-heading" className={styles.heading}>
            {/* The real string, for assistive tech and crawlers. */}
            <span className={styles.srOnly}>{hero.heading}</span>
            {/* A hidden copy reserves the finished line box at every width, so
                the typed overlay can fill in without reflowing the page. */}
            <span className={styles.ghost} aria-hidden="true">
              {hero.heading}
            </span>
            <span className={styles.typed} aria-hidden="true">
              <span ref={typedRef}>{hero.heading}</span>
              <span ref={caretRef} className={styles.caret} />
            </span>
          </h1>
        </div>
        <p className={styles.lead}>{hero.lead}</p>
      </div>

      <div ref={actionsRef} className={styles.actions}>
        <Button href={`mailto:${contact.email}`} size="lg">
          Start a project
        </Button>
        <Button
          href="#journey"
          size="lg"
          variant="secondary"
          iconAfter="arrow-right"
        >
          See the journey
        </Button>
        <Button
          href="/card"
          size="lg"
          variant="quiet"
          iconAfter="arrow-up-right"
          className={styles.quietAction}
        >
          Digital card
        </Button>
      </div>

      <StatRow items={facts} className={styles.stats} />
    </section>
  );
}
