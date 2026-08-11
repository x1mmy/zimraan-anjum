import { ImageResponse } from "next/og";
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from "@/lib/monogram-geometry";

/* 1200×630 share card: ZA monogram (same geometry as the favicon) centred on
   the forest tile so Facebook / Instagram / Slack unfurls stay on-brand. */

export const alt = "Zimraan Anjum";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafaf5",
        }}
      >
        <div
          style={{
            width: 360,
            height: 360,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#2d5a3d",
            borderRadius: 80,
          }}
        >
          <svg width="360" height="360" viewBox={MONOGRAM_VIEWBOX}>
            <path d={MONOGRAM_PATH} fill="#fafaf5" />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
