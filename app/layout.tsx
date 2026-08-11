import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { themeInitScript } from "@/components/ThemeToggle";
import { contact } from "@/lib/contact";
import "./globals.css";

/* Self-hosted by next/font, so there is no render-blocking request to Google. */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const description =
  "Zimraan Anjum is a full-stack product engineer in Sydney building websites, custom web apps and AI automation. Business Systems Engineer at Planna, founder of Stash Labs and Triggr.";

export const metadata: Metadata = {
  metadataBase: new URL(contact.site),
  title: {
    default: "Zimraan Anjum — Full-stack product engineer, Sydney",
    template: "%s · Zimraan Anjum",
  },
  description,
  keywords: [
    "Zimraan Anjum",
    "full-stack developer Sydney",
    "web developer Sydney",
    "AI automation Australia",
    "custom web apps",
    "product engineer",
  ],
  authors: [{ name: contact.name, url: contact.site }],
  creator: contact.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: contact.site,
    siteName: contact.name,
    title: "Zimraan Anjum — Full-stack product engineer, Sydney",
    description,
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zimraan Anjum — Full-stack product engineer, Sydney",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /* Single value rather than a prefers-color-scheme pair: the site opens light
     for everyone, so keying browser chrome to the OS setting would leave a dark
     status bar above a cream page. */
  themeColor: "#fafaf5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Must run before first paint, otherwise dark-mode visitors get a
            cream flash on every navigation. themeInitScript is a build-time
            constant with no interpolated input — nothing user-supplied reaches
            it, so there is no injection surface here. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
