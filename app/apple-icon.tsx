import { ImageResponse } from "next/og";
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from "@/lib/monogram-geometry";

/* Apple touch icons have to be raster, so this renders the same ZA geometry as
   app/icon.svg to a PNG at build time. Path data rather than text, so no font
   needs embedding in the image pipeline. */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2d5a3d",
        }}
      >
        <svg width="180" height="180" viewBox={MONOGRAM_VIEWBOX}>
          <path d={MONOGRAM_PATH} fill="#fafaf5" />
        </svg>
      </div>
    ),
    size,
  );
}
