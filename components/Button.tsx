import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "quiet" | "accent";
type Size = "lg" | "md" | "sm";

export type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconAfter?: IconName;
  /** Renders the hairline variant against the dark forest contact panel. */
  onForest?: boolean;
  fullWidth?: boolean;
  download?: string;
  className?: string;
};

/** Internal anchors and routes go through next/link; everything else is a plain <a>. */
function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconAfter,
  onForest = false,
  fullWidth = false,
  download,
  className,
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[size],
    styles[variant],
    onForest ? styles.onForest : "",
    fullWidth ? styles.fullWidth : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {icon ? <Icon name={icon} size={16} /> : null}
      <span>{children}</span>
      {iconAfter ? <Icon name={iconAfter} size={16} /> : null}
    </>
  );

  if (!href) {
    return (
      <button type="button" className={classes}>
        {inner}
      </button>
    );
  }

  if (download !== undefined || isExternal(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
