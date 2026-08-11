"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Monogram } from "./Monogram";
import { IconLink } from "./primitives";
import { ThemeToggle } from "./ThemeToggle";
import { socials } from "@/lib/content";
import styles from "./NavBar.module.css";

export type NavLink = { label: string; href: string };

type NavBarProps = {
  name: string;
  role?: string;
  links?: readonly NavLink[];
  action?: { label: string; href: string };
  /** Landing page tracks the section in view; the card page has no sections. */
  trackSections?: boolean;
};

export function NavBar({
  name,
  role,
  links = [],
  action,
  trackSections = false,
}: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Underline the nav item whose section is currently crossing the upper third
  // of the viewport.
  useEffect(() => {
    if (!trackSections || links.length === 0) return;

    const ids = links
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const onScroll = () => {
      const line = window.innerHeight * 0.33;
      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActiveHref(current ? `#${current}` : null);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [trackSections, links]);

  // A menu left open while the viewport widens back to desktop would otherwise
  // stay mounted and trap the page under a stale overlay.
  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 901px)");
    const close = () => setMenuOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={[styles.header, scrolled ? styles.scrolled : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label={`${name} — home`}>
          <Monogram size={34} className={styles.brandMark} />
          <span className={styles.brandText}>
            <span className={styles.brandName}>{name}</span>
            {role ? <span className={styles.brandRole}>{role}</span> : null}
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Sections">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={[
                styles.navLink,
                activeHref === link.href ? styles.navLinkActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={activeHref === link.href ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.utilities}>
          <div className={styles.socials}>
            {socials.map((social) => (
              <IconLink
                key={social.icon}
                href={social.href}
                icon={social.icon}
                label={social.label}
              />
            ))}
          </div>
          <ThemeToggle />
        </div>

        {action ? (
          <div className={styles.action}>
            <Button href={action.href} size="md">
              {action.label}
            </Button>
          </div>
        ) : null}

        {links.length > 0 ? (
          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={18} />
          </button>
        ) : null}
      </div>

      {menuOpen ? (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav} aria-label="Sections">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {action ? (
            <div className={styles.mobileAction}>
              <Button href={action.href} size="md" fullWidth>
                {action.label}
              </Button>
            </div>
          ) : null}
          <div className={styles.mobileSocials}>
            {socials.map((social) => (
              <IconLink
                key={social.icon}
                href={social.href}
                icon={social.icon}
                label={social.label}
              />
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
