import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from "@/lib/monogram-geometry";

/**
 * ZA monogram, set in Danfo and flattened to path data by
 * scripts/generate-monogram.mjs — see that file for why it is baked rather than
 * live text. The favicon and Apple touch icon draw the same geometry.
 */

type MonogramProps = {
  size?: number;
  /** `tile` puts the letters on a forest square; `plain` inherits currentColor. */
  variant?: "tile" | "plain";
  className?: string;
};

export function Monogram({
  size = 32,
  variant = "tile",
  className,
}: MonogramProps) {
  const tile = variant === "tile";
  return (
    <svg
      width={size}
      height={size}
      viewBox={MONOGRAM_VIEWBOX}
      role="img"
      aria-label="Zimraan Anjum"
      className={className}
    >
      {tile ? (
        <rect width="64" height="64" rx="14" fill="var(--accent)" />
      ) : null}
      <path
        d={MONOGRAM_PATH}
        fill={tile ? "var(--text-on-forest)" : "currentColor"}
      />
    </svg>
  );
}
