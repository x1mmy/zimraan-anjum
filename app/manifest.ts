import type { MetadataRoute } from "next";
import { contact } from "@/lib/contact";

/** Lets the digital card be saved to a phone's home screen as a standalone app. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${contact.name} — Product Engineer`,
    short_name: contact.name,
    description:
      "Digital business card and portfolio for Zimraan Anjum, full-stack product engineer in Sydney.",
    start_url: "/card",
    display: "standalone",
    background_color: "#fafaf5",
    theme_color: "#2d5a3d",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
