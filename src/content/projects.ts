import type { Img, LinkItem, Stat } from "./types";

export type DiagramKind = "omc" | "nota" | "crime" | "care";

export interface Project {
  slug: string;
  code: string;
  title: string;
  kind: string;
  year?: string;
  period: string;
  role: string;
  team: string;
  stack: string[];
  status: { label: string; tone: "live" | "neutral" | "award" };
  cardSummary: string;
  cardMetric: Stat;
  summary: string;
  cover: Img;
  links: LinkItem[];
  problem?: string[];
  howItWorks?: string;
  built: { heading: string; items: string[] };
  decision?: { title: string; body: string };
  results?: Stat[];
  resultNotes?: string[];
  learned?: { title: string; body: string };
  limits: string[];
  diagram?: { kind: DiagramKind; title: string; caption: string };
  gallery: Img[];
}

export const projects: Project[] = [
  {
    slug: "omc-stock-cash-flow",
    code: "P-01",
    title: "OMC Stock and Cash Flow App",
    kind: "Production web app",
    year: "2026",
    period: "Aug 2026 to present",
    role: "Designer and developer",
    team: "Solo, with Claude Code as pair programmer",
    stack: ["React", "TypeScript", "Tailwind", "Vite", "Supabase", "Postgres", "Cloudflare Workers"],
    status: { label: "In daily use since 27 Sep 2026", tone: "live" },
    cardSummary:
      "Stock, reseller consignment, and cash flow for my family's frozen food business, with the rules enforced inside the database.",
    cardMetric: { value: "14", label: "rules enforced in Postgres" },
    summary:
      "A mobile-first web app for warehouse stock, reseller consignment, and cash flow at a frozen food business. The whole interface is in Indonesian because the people using it every day do not read English.",
    cover: {
      src: "/projects/omc-cover-v2.png",
      width: 1920,
      height: 869,
      alt: "OMC app home screen with stock, consignment, and cash summary cards",
    },
    links: [
      {
        label: "Open the app",
        href: "https://omc-stok.elbetellus.workers.dev",
        note: "Opens the login screen, not live business data",
        kind: "live",
      },
    ],
    problem: [
      "Stock counts lived in people's heads, so two people gave two different numbers.",
      "Reseller reports ran over WhatsApp with no record of who approved what, or when.",
      "Money in and money out shared one bank account that nobody reconciled.",
      "Slow-moving stock at resellers was only noticed if someone happened to remember it.",
    ],
    built: {
      heading: "What I built",
      items: [
        "Stock quantities change only through recorded transactions, enforced by database triggers. No form lets anyone type a stock number.",
        "Prices lock at the moment of sale, so a future price change cannot rewrite past transactions.",
        "Access rules are enforced by row-level security in the database, not just by hiding buttons.",
        "A closed cash period is permanently locked, even for the owner, because it represents a reconciliation against a real bank balance.",
        "The home screen is built to be read in 30 seconds: anything that needs action sits above every number.",
        "Admins can correct their own entries under three limits at once: only their own rows, only within 12 hours, only non-money fields.",
        "The change log cannot be edited or deleted by anyone, including the owner.",
        "14 business rules are enforced by Postgres itself. For example: stock cannot go negative, a delivery note saves completely or not at all, only one cash period can be open, and money cannot be recorded without an open period.",
      ],
    },
    decision: {
      title: "The report I chose not to build",
      body: "A profit-loss report is the one feature everyone expects in an inventory app. The business sets prices from cost using a fixed split, so the margin is settled before any sale is recorded. A report would restate a number the owner already knows, through more steps and with more ways to be wrong. I built bank reconciliation instead, which the business could not do before.",
    },
    results: [
      { value: "14", label: "Business rules enforced by Postgres" },
      { value: "3", label: "Roles: owner, admin, read-only viewer" },
      { value: "12h", label: "Self-correction window for admins" },
      { value: "30s", label: "Target read time for the home screen" },
    ],
    resultNotes: [
      "In daily use for the family business's Jakarta operation since 27 September 2026.",
    ],
    limits: [
      "The public link opens the login screen only. Business data stays private.",
      "Built with AI assistance: the architecture, data model, and business rules are my decisions, and Claude Code wrote much of the syntax.",
    ],
    diagram: {
      kind: "omc",
      title: "Where the rules live",
      caption:
        "Every write goes through the same path. A valid sale passes the database checks; a sale that would push stock below zero is rejected by a trigger, whichever screen sent it.",
    },
    gallery: [
      {
        src: "/projects/omc/home.png",
        width: 1920,
        height: 869,
        alt: "OMC home screen",
        caption: "Home: warehouse stock, reseller consignment value, cash balance, and revenue for the period at a glance.",
      },
      {
        src: "/projects/omc/stok-masuk.png",
        width: 1920,
        height: 869,
        alt: "Stock-in log",
        caption: "Stock-in log: every incoming batch recorded by date and quantity.",
      },
      {
        src: "/projects/omc/barang-keluar.png",
        width: 1920,
        height: 869,
        alt: "Stock-out log",
        caption: "Stock-out log: separating what ships straight to Shopee from what is consigned to a reseller.",
      },
      {
        src: "/projects/omc/uang-keluar.png",
        width: 1920,
        height: 869,
        alt: "Expense log",
        caption: "Expense log: spending categorized from raw materials to rent.",
      },
      {
        src: "/projects/omc/kas.png",
        width: 1920,
        height: 869,
        alt: "Cash flow period view",
        caption: "Cash flow: opening balance, money in and out, and a system-reconciled closing balance.",
      },
      {
        src: "/projects/omc/produk.png",
        width: 1920,
        height: 869,
        alt: "Product catalog",
        caption: "Product catalog: selling price and warehouse stock per item.",
      },
    ],
  },
  {
    slug: "nota",
    code: "P-02",
    title: "Nota: Handwritten Notes to Data",
    kind: "Data cleaning and text matching",
    year: "2026",
    period: "Aug to Sep 2026",
    role: "Developer",
    team: "Solo, with Claude Code as pair programmer",
    stack: ["React", "TypeScript", "Supabase", "Cloudflare Workers", "Vision model", "Fuzzy matching"],
    status: { label: "Live", tone: "live" },
    cardSummary:
      "Turns a photo of a handwritten sales note into structured transaction data, evaluated module by module.",
    cardMetric: { value: "86.4%", label: "product match on 14 notes" },
    summary:
      "Resellers report sales as handwritten notes or WhatsApp messages, and each one would have to be retyped into the system. Nota turns a photo of a handwritten sales note into structured transaction data, framed as a data cleaning and text-matching problem.",
    cover: {
      src: "/projects/nota/koreksi-nota-cover.jpg",
      width: 854,
      height: 589,
      alt: "Nota correction screen showing a matched product, quantity, and price",
    },
    links: [{ label: "Open Nota", href: "https://nota.elbetellus.workers.dev", kind: "live" }],
    howItWorks:
      "Seven modules that catch each other's mistakes: capture the photo, read it with a vision model, match the handwritten product name to a real product catalog, validate the numbers against each other, let a person confirm anything uncertain, save, and measure accuracy.",
    built: {
      heading: "What I did",
      items: [
        "Wrote the matching module: it normalizes the text, tries a direct match first, then falls back to a similarity score when nothing matches exactly.",
        "Designed the confidence score to move in one direction only. A line the reader was unsure about can never look more certain by the time it reaches a reviewer.",
        "Built the correction screen so a wrong number takes one tap to fix, and the least certain lines are visibly flagged.",
        "Evaluated every module against a labeled test set instead of trusting one end-to-end number.",
      ],
    },
    results: [
      { value: "86.4%", label: "Product match" },
      { value: "100%", label: "Quantity" },
      { value: "95.5%", label: "Price" },
      { value: "~3s", label: "Median read time per note" },
    ],
    resultNotes: [
      "15 handwritten notes in the test set, 14 processed end to end, 22 line items.",
      "Every line flagged low-confidence was in fact wrong, so the flag never sent a reviewer to a correct line.",
      "One price, 93,000, was read as 43,000 and passed with high confidence. That is why the human confirmation step stays mandatory.",
    ],
    learned: {
      title: "Dendeng is not Rendang",
      body: "Three wrong reads all misread \"Dendeng\" (a regional dried-beef dish) as \"Rendang\" or \"Pundeng\", defaulting to the more common word when the handwriting was ambiguous. No amount of image preprocessing fixes that, and a single accuracy percentage hides it. I found it by reading every wrong case by hand.",
    },
    limits: [
      "Small test set: 15 notes with 1 to 3 lines each, written by me.",
      "The one failed note was a timeout at the vision API, not a misreading.",
      "Separate from OMC, and not yet tested with the owner's real daily notes.",
    ],
    diagram: {
      kind: "nota",
      title: "Seven modules, one direction of confidence",
      caption:
        "A note flows left to right. Confidence can drop at any module, but never rises again, so an uncertain reading reaches the reviewer still marked uncertain.",
    },
    gallery: [
      {
        src: "/projects/nota/koreksi-nota.jpg",
        width: 854,
        height: 1600,
        alt: "Nota correction screen on a phone",
        caption:
          "Note correction: OCR reads the handwritten receipt, matches the raw text to a catalog product, and lets the user fix the quantity, price, or the match itself before saving.",
      },
    ],
  },
  {
    slug: "crime-analytics",
    code: "P-03",
    title: "Crime Analytics Dashboard",
    kind: "Excel data model and dashboard",
    period: "Data Modelling course",
    role: "Data model measures and dashboard",
    team: "Team of 5. Teammates built the star schema and the Power Query load",
    stack: ["Excel", "Power Query", "Power Pivot", "DAX"],
    status: { label: "Course project", tone: "neutral" },
    cardSummary:
      "A star schema with every metric written as a DAX measure, so ratios stay correct under any combination of filters.",
    cardMetric: { value: "0", label: "formulas in worksheet cells" },
    summary:
      "An interactive Excel dashboard on a star schema, with every metric written as a DAX measure so ratios like solve rate and arrest rate stay correct under any combination of filters. The dataset is simulated, generated by the group: 200 case reports across 20 provinces, 15 crime categories, and 3 years.",
    cover: {
      src: "/projects/crime-analytics-cover.png",
      width: 1401,
      height: 641,
      alt: "Crime analytics dashboard with KPI cards, charts, and slicers",
    },
    links: [
      {
        label: "Download the Excel file",
        href: "/projects/crime-analytics-data.xlsx",
        note: "3.3 MB .xlsx",
        kind: "file",
      },
    ],
    built: {
      heading: "What I did",
      items: [
        "Wrote every metric as a measure inside the data model. There is not a single formula in a worksheet cell.",
        "The key measures are ratios (average response time, solve rate, arrest rate). That is exactly why they must live in the model: a ratio calculated per cell stops being true when the filter changes.",
        "Built the dashboard: 6 KPI cards, 10 charts, 14 pivot tables, and 4 slicers (year, severity, category, province) that cross-filter every visual.",
        "Arranged visuals by the question they answer (where and what, how fast, what changed), not by chart type. The KPI row sits on top and the whole dashboard fits one screen.",
        "Response time is a horizontal bar sorted fastest to slowest, because the useful item is the slowest category at the bottom edge.",
      ],
    },
    results: [
      { value: "6", label: "KPI cards" },
      { value: "10", label: "Charts" },
      { value: "14", label: "Pivot tables" },
      { value: "4", label: "Cross-filtering slicers" },
    ],
    learned: {
      title: "A number can be correct and still mislead",
      body: "Three crime categories showed an \"arrest rate\" above 100% (106.7, 106.5, 103.1). Nothing was broken: arrests are counted per person, so a case with two offenders correctly yields two arrests. The mistake was mine. I had labeled it a rate, added a percent sign, and drawn a capped bar, all promising a ceiling of 100 that the model never had. I renamed it \"Arrests per Case\" and removed the percent sign and the bar. Labels and chart types carry as much responsibility as the formula.",
    },
    limits: [
      "Simulated data generated by the group, so the dashboard shows how the model and measures behave, not anything about real crime.",
      "Team project: my part was the measures and the dashboard, not the schema or the data load.",
    ],
    diagram: {
      kind: "crime",
      title: "One fact table, five dimensions",
      caption:
        "Crime reports sit in the center. Every slicer filters a dimension, and every measure is computed from the fact table at query time, so no number is frozen in a cell.",
    },
    gallery: [
      {
        src: "/projects/crime-analytics-cover.png",
        width: 1401,
        height: 641,
        alt: "Full crime analytics dashboard",
        caption: "Full dashboard: KPI cards, crime distribution, arrest rates, and yearly trends.",
      },
      {
        src: "/projects/crime-analytics-star-schema.png",
        width: 1101,
        height: 752,
        alt: "Star schema in Power Pivot",
        caption:
          "Star schema in Power Pivot: one fact table (crime reports) connected to Calendar, Location, Crime Type, Officer, and Victim dimensions.",
      },
      {
        src: "/projects/crime-analytics-pivot-tables.png",
        width: 1619,
        height: 682,
        alt: "KPI scorecard and pivot tables",
        caption:
          "KPI scorecard and pivot tables behind the dashboard: arrest rate by crime type, and case distribution by province.",
      },
    ],
  },
  {
    slug: "care-engine",
    code: "P-04",
    title: "CARE Engine, B-Startion 2026",
    kind: "Business case competition",
    year: "2026",
    period: "B-Startion National Business Case Competition",
    role: "Connect pillar",
    team: "Team CONQUERORS",
    stack: ["Root cause analysis", "Systems integration", "Proposal writing"],
    status: { label: "Semifinalist", tone: "award" },
    cardSummary:
      "An AI layer for Mandaya Royal Hospital. I designed Connect: one patient ID across three disconnected systems.",
    cardMetric: { value: "Top 10", label: "of 90 teams, semifinal" },
    summary:
      "The semifinal case was Mandaya Royal Hospital. Our team proposed CARE, an AI layer that keeps the hospital's systems in sync after a patient leaves. I worked on Connect: linking three disconnected patient records without a costly system overhaul. The team advanced from the 90-team preliminary round into the top 10.",
    cover: {
      src: "/projects/bstartion-cover.jpg",
      width: 1414,
      height: 975,
      alt: "Cover of the CARE proposal for Mandaya Royal Hospital",
    },
    links: [
      {
        label: "Read the proposal",
        href: "https://docs.google.com/document/d/15vJH76YL5JaT0ogghRxbjsvSEknsbikM_j2LONxVAM4/edit?usp=sharing",
        kind: "doc",
      },
    ],
    built: {
      heading: "What I did on Connect",
      items: [
        "Proposed a lightweight patient hub that stores only relationship data: one patient number, contact, channel preference, consent, schedules, and points balance.",
        "Diagnoses, lab results, and doctor notes stay in the hospital's own system and are pulled by API only when needed.",
        "Duplicate records: AI only suggests possible duplicates, and the medical records staff decide on merging.",
        "Helped trace the root cause: the hospital manages visits, not patients.",
        "Tested the hospital's patient app directly. For example, a registration form asks for hobby data without explaining why, and the average active patient holds about 13,150 points while the cheapest medical reward costs 65,000.",
      ],
    },
    results: [
      { value: "Top 10", label: "Of 90 teams, advanced to the semifinal" },
      { value: "3 → 1", label: "Patient records linked by one ID" },
    ],
    limits: [
      "A competition proposal, not an implemented system.",
      "Team project: my part was the Connect pillar and the root cause work behind it.",
    ],
    diagram: {
      kind: "care",
      title: "Connect: one patient, one ID",
      caption:
        "Three systems keep their own data. The hub only holds the relationship layer and pulls clinical records on demand, so nothing sensitive is copied.",
    },
    gallery: [
      {
        src: "/projects/bstartion/cover-full.webp",
        width: 1414,
        height: 2000,
        alt: "Proposal cover",
        caption: "Cover, presented by team CONQUERORS.",
      },
      {
        src: "/projects/bstartion/connect-pillar.webp",
        width: 900,
        height: 1272,
        alt: "Connect pillar page",
        caption:
          "The Connect pillar: PatientHub, a lightweight bridge linking three separate hospital systems around one shared patient ID.",
      },
      {
        src: "/projects/bstartion/app-ui-mockups.png",
        width: 900,
        height: 1272,
        alt: "App mockups",
        caption: "App mockups for #SejutaLangkahMandaya, the patient step-tracking and rewards feature.",
      },
    ],
  },
  {
    slug: "nusantaratrip",
    code: "P-05",
    title: "NusantaraTrip",
    kind: "High-fidelity prototype",
    period: "Programming for Business course",
    role: "Team leader and prototype",
    team: "Group project",
    stack: ["Figma"],
    status: { label: "Prototype", tone: "neutral" },
    cardSummary:
      "A travel booking concept inspired by Traveloka. I led the team and built the high-fidelity Figma prototype.",
    cardMetric: { value: "Lead", label: "team lead and Figma prototype" },
    summary:
      "A travel booking website concept inspired by Traveloka, made for a Programming for Business group project. I led the team through discussion and task division, and built the high-fidelity Figma prototype. It is a prototype, not a built product.",
    cover: {
      src: "/projects/nusantaratrip/login.webp",
      width: 2000,
      height: 1357,
      alt: "NusantaraTrip login screen",
    },
    links: [
      {
        label: "Open in Figma",
        href: "https://www.figma.com/design/ZurhkbEmc96SEnQDme78IM/NusantaraTrip?node-id=5-559",
        kind: "figma",
      },
    ],
    built: {
      heading: "What I did",
      items: [
        "Led the team through discussion and task division.",
        "Built the high-fidelity prototype in Figma: destinations with search and filters, the brand story, and sign-in.",
      ],
    },
    limits: ["A prototype, not a built product."],
    gallery: [
      {
        src: "/projects/nusantaratrip/destinations.webp",
        width: 606,
        height: 2000,
        alt: "Destinations page",
        caption: "Destinations page: search, filter chips, and picks across domestic, international, and local tourism.",
      },
      {
        src: "/projects/nusantaratrip/about.webp",
        width: 592,
        height: 2000,
        alt: "About page",
        caption: "About page: the brand story, mission, values, and timeline.",
      },
      {
        src: "/projects/nusantaratrip/login.webp",
        width: 2000,
        height: 1357,
        alt: "Login screen",
        caption: "Login screen.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: projects[(i + 1) % projects.length],
  };
}
