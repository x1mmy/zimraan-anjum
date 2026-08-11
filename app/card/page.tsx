import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { contact } from "@/lib/contact";
import { card, cardTiles } from "@/lib/content";
import styles from "./card.module.css";

export const metadata: Metadata = {
  title: "Digital card",
  description: `Save Zimraan Anjum's contact details — product engineer in Sydney. Call, email, LinkedIn, GitHub, or add straight to your contacts.`,
  alternates: { canonical: "/card" },
  openGraph: {
    title: "Zimraan Anjum · Digital card",
    description:
      "Product engineer in Sydney. Tap to call, email, or save my contact details.",
    url: `${contact.site}/card`,
  },
};

export default function CardPage() {
  return (
    <main id="main" className={styles.page}>
      <div className={styles.card}>
        <div className={styles.themeCorner}>
          <ThemeToggle />
        </div>

        <header className={styles.header}>
          <div className={styles.portraitRing}>
            <Image
              src="/images/zimraan.jpg"
              alt="Zimraan Anjum"
              width={296}
              height={296}
              className={styles.portrait}
              priority
            />
          </div>

          <h1 className={styles.name}>{contact.name}</h1>

          <div className={styles.role}>
            <span className={styles.rule} aria-hidden="true" />
            {card.role}
            <span className={styles.rule} aria-hidden="true" />
          </div>

          <p className={styles.blurb}>{card.blurb}</p>
        </header>

        <nav className={styles.tiles} aria-label="Contact links">
          {cardTiles.map((tile) => {
            const external = tile.href.startsWith("http");
            return (
              <a
                key={tile.label}
                href={tile.href}
                className={styles.tile}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <Icon name={tile.icon} size={20} />
                <span className={styles.tileLabel}>{tile.label}</span>
              </a>
            );
          })}
        </nav>

        <div className={styles.actions}>
          {/* A real file download rather than a generated Blob: it works with
              JavaScript disabled and iOS/Android hand it to Contacts directly. */}
          <Button
            href="/zimraan-anjum.vcf"
            download="Zimraan-Anjum.vcf"
            variant="accent"
            size="lg"
            icon="user"
            fullWidth
          >
            Save my contact
          </Button>
          <Button
            href="/"
            variant="secondary"
            size="lg"
            iconAfter="arrow-right"
            fullWidth
          >
            See my work
          </Button>
        </div>

        <footer className={styles.footer}>
          <Image
            src="/qr-contact.svg"
            alt="QR code containing Zimraan Anjum's contact details"
            width={104}
            height={104}
            className={styles.qr}
            unoptimized
          />
          <div className={styles.footerMeta}>
            Scan to save
            <br />
            {contact.phoneDisplay}
            <br />
            {contact.location}
          </div>
        </footer>

        <Link href="/" className={styles.backLink}>
          zimraananjum.com
        </Link>
      </div>
    </main>
  );
}
