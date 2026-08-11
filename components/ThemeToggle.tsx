"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "./Icon";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "zim-theme";

/**
 * Inlined in <head> so `data-theme` is on <html> before first paint — without it
 * a visitor who chose dark gets a cream flash on every navigation.
 *
 * Light is the default for everyone: the brand ground is warm paper, and that is
 * the look the site should open on regardless of the visitor's OS setting. Dark
 * is opt-in through the toggle, and that choice then persists.
 */
export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    document.documentElement.setAttribute("data-theme", stored === "dark" ? "dark" : "light");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

/* The `data-theme` attribute on <html> is the single source of truth — the init
   script writes it before paint, so component state would only ever be a stale
   copy. Reading it through a store keeps the two from drifting and picks up
   changes made by any other toggle on the page. */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "light");

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing with storage blocked — the toggle still works for this
      // page view, it just will not persist.
    }
  };

  const label =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={styles.toggle}
      suppressHydrationWarning
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
    </button>
  );
}
