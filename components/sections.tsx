import { Button } from "./Button";
import { Eyebrow, SectionHeader } from "./primitives";
import { Reveal } from "./Reveal";
import { VentureCards } from "./VentureCards";
import {
  buildLog,
  doors,
  services,
  strengths,
  strengthsCaveat,
} from "@/lib/content";
import styles from "./sections.module.css";

/** The two-audience split: business owners on the left, hiring managers right. */
export function Doors() {
  return (
    <section id="doors" className={styles.section}>
      <div className={styles.doors}>
        {doors.map((door, i) => (
          <Reveal key={door.eyebrow} delay={i}>
            <div className={styles.door}>
              <Eyebrow>{door.eyebrow}</Eyebrow>
              <h2 className={styles.doorTitle}>{door.title}</h2>
              <p className={styles.doorBody}>{door.body}</p>
              <div className={styles.doorActions}>
                <Button
                  href={door.primary.href}
                  size="md"
                  variant={i === 0 ? "primary" : "secondary"}
                  iconAfter="arrow-right"
                >
                  {door.primary.label}
                </Button>
                <Button
                  href={door.secondary.href}
                  size="md"
                  variant="quiet"
                  iconAfter="arrow-up-right"
                >
                  {door.secondary.label}
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Ventures() {
  return (
    <section id="ventures" className={styles.section}>
      <Reveal>
        <SectionHeader
          eyebrow="Ventures"
          title="Two companies I build inside."
          note="One makes software for Australian small businesses. The other builds the automation that runs behind them."
        />
      </Reveal>
      <VentureCards />
    </section>
  );
}

export function BuildLog() {
  return (
    <section id="work" className={styles.section}>
      <Reveal>
        <SectionHeader
          eyebrow="Build log"
          title="What I am building, month by month."
          note="Written the way I would explain it to a friend, not the way it would appear in a case study."
        />
      </Reveal>

      <ol className={styles.buildLog}>
        {buildLog.map((entry, i) => (
          <Reveal key={entry.month} as="li" delay={i} className={styles.buildEntry}>
            <div className={styles.buildMonth}>{entry.month}</div>
            <div className={styles.buildLines}>
              {entry.lines.map((line, j) => (
                <p key={j} className={styles.buildLine}>
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function Strengths() {
  return (
    <section id="strengths" className={styles.section}>
      <Reveal>
        <SectionHeader
          eyebrow="What I am good at"
          title="Where I fit on a problem."
          note="Ordered by what I reach for first. The last line is the honest one."
        />
      </Reveal>

      <ul className={styles.strengths}>
        {strengths.map((strength, i) => (
          <Reveal
            key={strength.num}
            as="li"
            delay={i % 2}
            className={styles.strength}
          >
            <div className={styles.strengthNum}>{strength.num}</div>
            <div>
              <h3 className={styles.strengthName}>{strength.name}</h3>
              <p className={styles.strengthNote}>{strength.note}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <p className={styles.caveat}>{strengthsCaveat}</p>
      </Reveal>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className={styles.section}>
      <Reveal>
        <SectionHeader
          eyebrow="Work with me"
          title="What you can hire me to build."
          note="Scope and price depend on the problem. Tell me what is broken and I will tell you what it takes."
        />
      </Reveal>

      <ol className={styles.services}>
        {services.map((service, i) => (
          <Reveal key={service.num} as="li" delay={i} className={styles.service}>
            <div className={styles.serviceNum}>{service.num}</div>
            <h3 className={styles.serviceName}>{service.name}</h3>
            <p className={styles.serviceNote}>{service.note}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <div className={styles.servicesFooter}>
          <Button href="/card" size="md" variant="secondary" iconAfter="arrow-right">
            Open my digital card
          </Button>
          <span className={styles.servicesFooterNote}>
            Save my details in one tap
          </span>
        </div>
      </Reveal>
    </section>
  );
}
