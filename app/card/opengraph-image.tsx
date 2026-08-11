import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Overrides the root monogram OG image for /card — social unfurls use the
   portrait instead. Served as a static JPEG from public/, not regenerated. */

export const alt = "Zimraan Anjum";
export const size = { width: 1066, height: 1600 };
export const contentType = "image/jpeg";

export default async function Image() {
  const body = await readFile(
    join(process.cwd(), "public/images/zimraan.jpg"),
  );
  return new Response(body, {
    headers: { "Content-Type": "image/jpeg" },
  });
}
