/**
 * Single source of truth for contact details.
 *
 * The vCard string here is what both the QR code (generated at build time by
 * `scripts/generate-assets.mjs`) and the downloadable .vcf file are built from,
 * so the two can never drift apart.
 */

export const contact = {
  name: "Zimraan Anjum",
  firstName: "Zimraan",
  lastName: "Anjum",
  title: "Product Engineer",
  role: "Business Systems Engineer, Planna",
  org: "Planna",
  location: "Sydney, Australia",
  email: "zimraan2012@gmail.com",
  phone: "+61493324958",
  phoneDisplay: "0493 324 958",
  site: "https://www.zimraananjum.com",
  linkedin: "https://www.linkedin.com/in/zimraananjum/",
  github: "https://github.com/x1mmy",
  stashLabs: "https://www.stashlabs.com.au/",
} as const;

/** RFC 6350-ish vCard 3.0 — the format iOS and Android both import cleanly. */
export function buildVCard(): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${contact.lastName};${contact.firstName};;;`,
    `FN:${contact.name}`,
    `TITLE:${contact.title}`,
    `ORG:${contact.org}`,
    `TEL;TYPE=CELL:${contact.phone}`,
    `EMAIL:${contact.email}`,
    `URL:${contact.site}`,
    `URL:${contact.stashLabs}`,
    `URL:${contact.linkedin}`,
    "ADR;TYPE=WORK:;;;Sydney;NSW;;Australia",
    "END:VCARD",
  ].join("\r\n");
}
