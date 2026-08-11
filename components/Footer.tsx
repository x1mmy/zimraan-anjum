import Link from "next/link";
import { IconLink } from "./primitives";
import { contact } from "@/lib/contact";
import { footer, socials } from "@/lib/content";
import styles from "./Footer.module.css";

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={styles.link}>
        {label}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={styles.link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.name}>{contact.name}</div>
          <div className={styles.location}>{contact.location}</div>
          <p className={styles.blurb}>{footer.blurb}</p>
          <div className={styles.socials}>
            {socials.map((social) => (
              <IconLink
                key={social.icon}
                href={social.href}
                icon={social.icon}
                label={social.label}
              />
            ))}
          </div>
        </div>

        {footer.columns.map((column) => (
          <div key={column.title}>
            <div className={styles.columnTitle}>{column.title}</div>
            <div className={styles.columnLinks}>
              {column.items.map((item) => (
                <FooterLink key={item.label} href={item.href} label={item.label} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.baseline}>
        <span>{footer.copyright}</span>
        <span>Built and maintained by hand</span>
      </div>
    </footer>
  );
}
