# zimraananjum.com

Personal site for **Zimraan Anjum** — full-stack product engineer in Sydney. Built with Next.js App Router and deployed on Vercel.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run assets` | Regenerate QR / monogram assets |

## Routes

- `/` — landing page
- `/card` — digital contact card (vCard + QR)

## SEO & discovery

| File | Purpose |
| --- | --- |
| `app/robots.ts` | Serves `/robots.txt` |
| `app/sitemap.ts` | Serves `/sitemap.xml` |
| `public/llm.txt` | Machine-readable site summary for LLM crawlers |
| `app/opengraph-image.tsx` | Homepage share preview (ZA monogram) |
| `app/card/opengraph-image.tsx` | Card share preview (portrait photo) |

## Content

Copy and contact details live in:

- `lib/content.ts` — page copy
- `lib/contact.ts` — name, email, links, vCard source

## Deploy

Pushes to `main` on [x1mmy/zimraan-anjum](https://github.com/x1mmy/zimraan-anjum) deploy via Vercel to [www.zimraananjum.com](https://www.zimraananjum.com).
