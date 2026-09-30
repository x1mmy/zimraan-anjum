/**
 * All site copy lives here so the page components stay layout-only.
 * Editing the site is editing this file.
 */

import type { IconName } from "@/components/Icon";
import { contact } from "./contact";

export const socials: readonly {
  icon: IconName;
  href: string;
  label: string;
}[] = [
  { icon: "linkedin", href: contact.linkedin, label: "LinkedIn" },
  { icon: "github", href: contact.github, label: "GitHub" },
  { icon: "mail", href: `mailto:${contact.email}`, label: "Email" },
];

export const navLinks = [
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  location: "Sydney, Australia",
  heading: "I build web products that hold up in production.",
  lead: "Full-stack product engineer. I take things from a rough idea to something a team uses every day. Spec, architecture, deploy, demo.",
} as const;

export const facts = [
  { label: "Role", value: "Business Systems Engineer, Planna" },
  { label: "Also", value: "Founder, Stash Labs" },
  { label: "Based", value: "Sydney, Australia" },
  { label: "Focus", value: "Web products and automation" },
] as const;

/** The two audiences the site splits on, immediately under the hero. */
export const doors = [
  {
    eyebrow: "If you run a business",
    title: "I fix your site, build you a new one, or automate the manual work.",
    body: "Websites, web apps and AI systems, delivered in weeks. The person who scopes it is the person who builds it.",
    primary: { label: "See what I build", href: "#services" },
    secondary: { label: "Digital card", href: "/card" },
  },
  {
    eyebrow: "If you are hiring",
    title: "Intern to owning systems end to end in two years.",
    body: "Currently Business Systems Engineer at Planna, building quoting, CRM and integration systems from spec to demo.",
    primary: { label: "Read the journey", href: "#journey" },
    secondary: { label: "LinkedIn", href: contact.linkedin },
  },
] as const;

export const about = {
  heading: "I build the tools that run your business.",
  paragraphs: [
    'Most projects land on my desk as a rough idea. "We need a portal," "this process takes too long," "can we automate this?" I turn that into a working product. Spec, architecture, build, deploy. Usually in the same week.',
    "I'm a full-stack web developer and AI/automation engineer based in Sydney. I build custom web apps, internal platforms, CRM integrations, payment systems, and workflow automation, the kind of software that replaces the spreadsheets, manual processes, and duct-taped tools holding your operations together.",
    "Where I'm sharpest: taking a business problem apart, figuring out which pieces should be automated, which need a proper UI, and which just need a better workflow, then building the whole thing end to end.",
    "I use AI as a real engineering tool, not a gimmick. From AI-assisted product scoping and architecture to automated content pipelines and intelligent workflow agents, I build systems where AI does the heavy lifting and humans stay in control.",
  ],
  stack: [
    "Next.js",
    "React",
    "Django",
    "Python",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Stripe",
    "HubSpot",
    "Pipedream",
    "Airtable",
    "Cloudflare Workers",
    "Vercel",
    "AWS",
  ],
} as const;

export const journey = [
  {
    date: "Aug 2024 – Nov 2024",
    role: "Software Engineer Intern",
    org: "All in IT Solutions",
    note: "Wireframes and specs for enterprise software and client-facing apps. First look at how a build gets decided before anyone writes code.",
  },
  {
    date: "Nov 2024 – Nov 2025",
    role: "Junior Web Developer",
    org: "All in IT Solutions",
    note: "Client websites end to end, across a wide range of industries, on deadline.",
  },
  {
    date: "Feb 2025 – Mar 2026",
    role: "AI & Automation Developer",
    org: "All in IT Solutions",
    note: "Automation for business operations, cutting manual steps out of the way people actually worked, not out of a diagram.",
  },
  {
    date: "Mar 2025 – May 2025",
    role: "Full Stack Developer",
    org: "Luxtronic",
    note: "Led a four-person team replacing a service centre's paper process with a web app. Requirements, architecture, delivery, 15 weeks.",
  },
  {
    date: "Aug 2025 – Dec 2025",
    role: "Founding Software Engineer",
    org: "Taskorly",
    note: "Tech lead across frontend and backend from the first commit.",
  },
  {
    date: "Nov 2025 – Present",
    role: "Founder",
    org: "Stash Labs",
    note: "Started building SaaS for Australian small businesses with two others. LifeCycle, TimeTally, and client sites.",
  },
  {
    date: "Feb 2026 – Present",
    role: "Business Systems Engineer",
    org: "Planna",
    note: "Internal tools, platforms and automation across the Arche Ventures portfolio: Planna, ApproveAll and Woodsmead. I own projects end to end, from scoping and architecture through to deployment and stakeholder handoff.",
  },
] as const;

export const ventures = [
  {
    eyebrow: "Founder",
    name: "Stash Labs",
    body: "Three computer science students building software for Australian small businesses. LifeCycle tracks expiry dates for retailers and cafes. TimeTally turns a five-hour payroll run into one.",
    tags: ["SaaS", "LifeCycle", "TimeTally", "Client sites"],
    href: contact.stashLabs,
    display: "stashlabs.com.au",
  },
] as const;

export const buildLog = [
  {
    month: "September 2026",
    lines: [
      "Built a client onboarding automation for ApproveAll. HubSpot deal hits the pipeline, five-step Pipedream workflow creates a Monday project card with a document checklist, builds a Dropbox folder tree, and mints an encrypted client form link — conditional logic across three states, eight project types, Google Maps autocomplete. Added seven required fields so sales cannot kick off onboarding without proper project context. Live within two weeks.",
      "The hard part was not the pipeline. It was making sure a deal with missing context never generates a client form.",
      "Redesigned the full ApproveAll site on Webflow with reusable templates for case studies and services. Fixed three defects in the exec portal cashflow model — overrides now carry forward, income and cost edits are independent, and you can actually clear an override. Sunsetted Bubble entirely. Connected Claude workflow telemetry to the metrics dashboard so leadership can see per-report generation progress and AI costs. Expanded the dashboard with WM utilisation, profitability per project, AA invoice forecasting, an app integration map, and a group org chart across three businesses.",
      "The metrics dashboard started as a replacement for one Google Sheet. It now runs operations for the group.",
    ],
  },
  {
    month: "August 2026",
    lines: [
      "Built a custom invoicing portal for ApproveAll, replacing PandaDoc after the sales team rejected the template structure. HubSpot deal pull, editable pricing table, per-instalment Stripe Checkout with click-to-accept e-sign. Spec to production in five days.",
      "The hard part was not the payments. It was making the pricing table feel like a spreadsheet to people who had been living in one.",
      "Now building a group-level exec portal — rolling 24-month forecast engine where monthly close actuals re-anchor projections across three businesses.",
    ],
  },
  {
    month: "July 2026",
    lines: [
      "Migrated ApproveAll from Dubsado to HubSpot — full CRM, data export, automations, trained the sales team. Shipped a timesheet system for multi-state planning operations and a blog publishing automation that pushes content to Webflow CMS via API.",
      "Spent more time on the approval screen than on the pay calculation. That is the screen someone opens every Monday.",
    ],
  },
  {
    month: "June 2026",
    lines: [
      "Quoting and CRM automation. Sales rebuilt the same quote by hand every time. Built the pipeline so deals flow through automatically — quote generated, CRM updated, no one re-typing addresses into a PDF. Started a group metrics dashboard replacing manual Google Sheets with live operational data.",
    ],
  },
] as const;

export const strengths = [
  {
    num: "01",
    name: "Product thinking",
    note: "Working out what should be built before writing anything. Usually the highest-leverage hour of a project.",
  },
  {
    num: "02",
    name: "Frontend",
    note: "React, Next.js, TypeScript. Interfaces that stay fast and legible once real data lands in them.",
  },
  {
    num: "03",
    name: "Backend and data",
    note: "Node, Supabase, Postgres, PHP. Schemas designed for the questions the business will actually ask.",
  },
  {
    num: "04",
    name: "Automation and integrations",
    note: "n8n, webhooks, HubSpot, Stripe. Removing the manual step someone repeats fifty times a week.",
  },
  {
    num: "05",
    name: "AI engineering",
    note: "Applied, not academic. Models wired into a product where they do a job someone was doing by hand.",
  },
  {
    num: "06",
    name: "Shipping to production",
    note: "Deploys, monitoring, the unglamorous last ten percent. Something is not built until it is being used.",
  },
  {
    num: "07",
    name: "Working with non-technical clients",
    note: "Translating a business problem into scope, and scope back into plain English.",
  },
  {
    num: "08",
    name: "Leading a small team",
    note: "Four-person SDLC delivery, and tech lead from the first commit at Taskorly.",
  },
] as const;

export const strengthsCaveat =
  "What I do not do: pure data science and ML research. I use models, I do not train them. If that is the actual problem, I will tell you and point you at someone who does it properly.";

export const services = [
  {
    num: "01",
    name: "Websites",
    note: "A proper site, built and live in weeks. Not a template, not a three-month agency timeline.",
  },
  {
    num: "02",
    name: "Custom web apps",
    note: "The tool your business runs on when the off-the-shelf option does not fit how you work.",
  },
  {
    num: "03",
    name: "AI automation",
    note: "Quoting, follow-ups, reporting, handoffs. I find the manual work first, then remove it.",
  },
  {
    num: "04",
    name: "Internal tools & dashboards",
    note: "One place your team can see what is happening, instead of four tabs and a spreadsheet.",
  },
  {
    num: "05",
    name: "Integrations & API work",
    note: "Idempotent webhooks, backfill commands, audit trails. The plumbing that does not silently break.",
  },
  {
    num: "06",
    name: "Technical advisory",
    note: "Scoping, architecture and a straight answer on what to build, what to buy, and what to skip.",
  },
] as const;

export const contactSection = {
  eyebrow: "Contact",
  heading: "Have something that needs building properly?",
  body: "Websites, product builds, automation. Send me what the problem is and roughly when you need it working.",
  action: { label: "Email me", href: `mailto:${contact.email}` },
  secondary: {
    label: `Call ${contact.phoneDisplay}`,
    href: `tel:${contact.phone}`,
  },
} as const;

export const footer = {
  blurb: "Full-stack product engineer. Founder at Stash Labs.",
  copyright: `© ${new Date().getFullYear()} Zimraan Anjum`,
  columns: [
    {
      title: "Ventures",
      items: [
        { label: "Stash Labs", href: contact.stashLabs },
        { label: "Digital card", href: "/card" },
      ],
    },
    {
      title: "Elsewhere",
      items: [
        { label: "LinkedIn", href: contact.linkedin },
        { label: "GitHub", href: contact.github },
        { label: contact.email, href: `mailto:${contact.email}` },
      ],
    },
  ],
} as const;

/** The tap targets on the digital business card. */
export const cardTiles: readonly {
  label: string;
  icon: IconName;
  href: string;
}[] = [
  { label: "Call", icon: "phone", href: `tel:${contact.phone}` },
  { label: "Email", icon: "mail", href: `mailto:${contact.email}` },
  { label: "LinkedIn", icon: "linkedin", href: contact.linkedin },
  { label: "GitHub", icon: "github", href: contact.github },
  { label: "Stash Labs", icon: "external-link", href: contact.stashLabs },
];

export const card = {
  role: "Product engineer · Sydney",
  blurb:
    "Websites, web apps and AI automation for businesses that need it working, not demoed.",
} as const;
