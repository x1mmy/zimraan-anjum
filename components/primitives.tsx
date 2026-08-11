import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./primitives.module.css";

/* --- Eyebrow -------------------------------------------------------------- */

export function Eyebrow({
  children,
  onForest = false,
  className,
}: {
  children: ReactNode;
  onForest?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        styles.eyebrow,
        onForest ? styles.eyebrowOnForest : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

/* --- Tag ------------------------------------------------------------------ */

export function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "forest" | "highlight";
}) {
  const toneClass =
    tone === "forest"
      ? styles.tagForest
      : tone === "highlight"
        ? styles.tagHighlight
        : "";
  return (
    <span className={[styles.tag, toneClass].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}

export function TagList({ items }: { items: readonly string[] }) {
  return (
    <div className={styles.tagList}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}

/* --- IconLink ------------------------------------------------------------ */

export function IconLink({
  href,
  icon,
  label,
  size = 18,
}: {
  href: string;
  icon: IconName;
  label: string;
  size?: number;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      title={label}
      aria-label={label}
      className={styles.iconLink}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <Icon name={icon} size={size} />
    </a>
  );
}

/* --- StatRow ------------------------------------------------------------- */

export function StatRow({
  items,
  className,
}: {
  items: readonly { label: string; value: string }[];
  className?: string;
}) {
  return (
    <dl className={[styles.statRow, className ?? ""].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className={styles.statLabel}>{item.label}</dt>
          <dd className={styles.statValue}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* --- SectionHeader ------------------------------------------------------- */

export function SectionHeader({
  eyebrow,
  title,
  note,
  id,
}: {
  eyebrow: string;
  title: string;
  note?: string;
  id?: string;
}) {
  return (
    <header className={styles.sectionHeader}>
      <Eyebrow>{eyebrow}</Eyebrow>
      {note ? (
        <div className={styles.sectionHeaderSplit}>
          <h2 id={id} className={styles.sectionHeaderTitle}>
            {title}
          </h2>
          <p className={styles.sectionHeaderNote}>{note}</p>
        </div>
      ) : (
        <h2 id={id} className={styles.sectionHeaderTitle}>
          {title}
        </h2>
      )}
    </header>
  );
}
