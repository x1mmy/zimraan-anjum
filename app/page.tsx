import { About } from "@/components/About";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { NavBar } from "@/components/NavBar";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/primitives";
import {
  BuildLog,
  Doors,
  Services,
  Strengths,
  Ventures,
} from "@/components/sections";
import { contact } from "@/lib/contact";
import { navLinks } from "@/lib/content";
import styles from "./page.module.css";

/** JSON-LD so search engines and the LinkedIn/Slack unfurlers get the facts right. */
function structuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: contact.name,
    url: contact.site,
    jobTitle: "Business Systems Engineer",
    email: `mailto:${contact.email}`,
    telephone: contact.phone,
    image: `${contact.site}/images/zimraan.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    worksFor: { "@type": "Organization", name: "Planna" },
    sameAs: [
      contact.linkedin,
      contact.github,
      contact.stashLabs,
    ],
    knowsAbout: [
      "Full-stack web development",
      "AI automation",
      "Systems integration",
      "Product engineering",
    ],
  };
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Serialised from the static object above — no external input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />

      <ReadingProgress />

      <NavBar
        name={contact.name}
        role="Engineer at Planna"
        links={navLinks}
        action={{ label: "Digital card", href: "/card" }}
        trackSections
      />

      <main id="main" className={styles.main}>
        <Hero />

        <Doors />

        <section id="about" className={styles.section}>
          <About />
        </section>

        <section id="journey" className={styles.section}>
          <Reveal>
            <SectionHeader
              eyebrow="Journey"
              title="Two years, intern to owning systems."
              note="Every role below is a step where the scope got bigger. Scroll and it follows along."
            />
          </Reveal>
          <Journey />
        </section>

        <Ventures />
        <BuildLog />
        <Strengths />
        <Services />

        <section id="contact" className={styles.section}>
          <Reveal>
            <ContactCTA />
          </Reveal>
        </section>

        <Footer />
      </main>
    </>
  );
}
