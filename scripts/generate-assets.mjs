/**
 * Generates the two contact artefacts that would otherwise be fetched from a
 * third-party service at runtime:
 *
 *   public/zimraan-anjum.vcf   — the downloadable contact card
 *   public/qr-contact.svg      — a QR code encoding the same vCard
 *
 * Both are committed, so the site has no external runtime dependency for them.
 * Re-run with `npm run assets` after editing lib/contact.ts.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Mirrors lib/contact.ts. Kept in plain JS so the script needs no TS runtime.
const contact = {
  firstName: "Zimraan",
  lastName: "Anjum",
  name: "Zimraan Anjum",
  title: "Product Engineer",
  org: "Planna",
  email: "zimraan2012@gmail.com",
  phone: "+61493324958",
  site: "https://www.zimraananjum.com",
  stashLabs: "https://www.stashlabs.com.au/",
  linkedin: "https://www.linkedin.com/in/zimraananjum/",
};

const vcard = [
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

mkdirSync(resolve(root, "public"), { recursive: true });
writeFileSync(resolve(root, "public/zimraan-anjum.vcf"), vcard, "utf8");

// currentColor lets the QR inherit the surrounding text colour, so it stays
// legible in both light and dark themes without shipping two files.
const svg = await QRCode.toString(vcard, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 0,
  color: { dark: "#000000ff", light: "#0000" },
});

writeFileSync(
  resolve(root, "public/qr-contact.svg"),
  svg.replace(/(stroke|fill)="#000000(ff)?"/g, '$1="currentColor"'),
  "utf8",
);

console.log("wrote public/zimraan-anjum.vcf and public/qr-contact.svg");
