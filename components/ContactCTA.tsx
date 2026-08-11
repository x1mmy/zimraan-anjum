import { Button } from "./Button";
import { Eyebrow } from "./primitives";
import { contactSection } from "@/lib/content";
import styles from "./ContactCTA.module.css";

/** Closing ask: forest panel, one heading, one amber action. */
export function ContactCTA() {
  return (
    <div className={styles.panel}>
      <div>
        <Eyebrow onForest className={styles.eyebrow}>
          {contactSection.eyebrow}
        </Eyebrow>
        <h2 className={styles.heading}>{contactSection.heading}</h2>
        <p className={styles.body}>{contactSection.body}</p>
      </div>

      <div className={styles.actions}>
        <Button
          href={contactSection.action.href}
          size="lg"
          variant="accent"
          iconAfter="arrow-up-right"
        >
          {contactSection.action.label}
        </Button>
        <Button
          href={contactSection.secondary.href}
          size="lg"
          variant="secondary"
          onForest
        >
          {contactSection.secondary.label}
        </Button>
      </div>
    </div>
  );
}
