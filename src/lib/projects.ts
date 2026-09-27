import type { WorksWheelItem } from "@/components/ui/works-wheel";

export interface GalleryImage {
  src: string;
  caption: string;
  /** Intrinsic size, so the detail dialog can show it at full width with no crop. */
  width: number;
  height: number;
}

export interface ProjectItem extends WorksWheelItem {
  description: string;
  /** Extra screenshots shown in a "See screenshots" dialog, for detail a small cover can't show. */
  gallery?: GalleryImage[];
}

export const projects: ProjectItem[] = [
  {
    title: "Crime Analytics Dashboard",
    image: "/projects/crime-analytics-cover.png",
    href: "/projects/crime-analytics-data.xlsx",
    description:
      "An interactive Excel dashboard built for a Data Modelling course project: a star schema, DAX measures, and slicers for crime trends across categories and provinces.",
    gallery: [
      {
        src: "/projects/crime-analytics-cover.png",
        caption:
          "Full dashboard: KPI cards, crime distribution, arrest rates, and yearly trends.",
        width: 1401,
        height: 641,
      },
      {
        src: "/projects/crime-analytics-star-schema.png",
        caption:
          "Star schema in Power Pivot: one fact table (crime reports) connected to Calendar, Location, Crime Type, Officer, and Victim dimensions.",
        width: 1101,
        height: 752,
      },
      {
        src: "/projects/crime-analytics-pivot-tables.png",
        caption:
          "KPI scorecard and pivot tables behind the dashboard: arrest rate by crime type, and case distribution by province.",
        width: 1619,
        height: 682,
      },
    ],
  },
  {
    title: "Nota Product Matching",
    image: "/projects/nota/koreksi-nota-cover.jpg",
    href: "https://nota.elbetellus.workers.dev/",
    description:
      "A fuzzy text-matching module for Nota, framed as a data cleaning and NLP problem: matching messy handwritten product names to a clean product catalog.",
    gallery: [
      {
        src: "/projects/nota/koreksi-nota.jpg",
        caption:
          "Note correction: OCR reads the handwritten receipt, matches the raw text to a catalog product, and lets the user fix the quantity, price, or the match itself before saving.",
        width: 854,
        height: 1600,
      },
    ],
  },
  {
    title: "OMC Inventory & Sales",
    image: "/projects/omc-cover-v2.png",
    href: "https://omc-stok.elbetellus.workers.dev",
    description:
      "The inventory and sales system I built for my family's frozen food business, with consignment rules enforced directly in the database. Sign-in protected, this link opens the login screen, not live business data.",
    gallery: [
      {
        src: "/projects/omc/home.png",
        caption:
          "Home: warehouse stock, reseller consignment value, cash balance, and revenue for the period at a glance",
        width: 1920,
        height: 869,
      },
      {
        src: "/projects/omc/stok-masuk.png",
        caption: "Stock-in log: every incoming batch recorded by date and quantity",
        width: 1920,
        height: 869,
      },
      {
        src: "/projects/omc/barang-keluar.png",
        caption:
          "Stock-out log: separating what ships straight to Shopee from what's consigned to a reseller",
        width: 1920,
        height: 869,
      },
      {
        src: "/projects/omc/uang-keluar.png",
        caption: "Expense log: spending categorized from raw materials to rent",
        width: 1920,
        height: 869,
      },
      {
        src: "/projects/omc/kas.png",
        caption:
          "Cash flow: opening balance, money in and out, and a system-reconciled closing balance",
        width: 1920,
        height: 869,
      },
      {
        src: "/projects/omc/produk.png",
        caption: "Product catalog: selling price and warehouse stock per item",
        width: 1920,
        height: 869,
      },
    ],
  },
  {
    title: "NusantaraTrip",
    image: "/projects/nusantaratrip/login.webp",
    href: "https://www.figma.com/design/ZurhkbEmc96SEnQDme78IM/NusantaraTrip?node-id=5-559",
    description:
      "A travel booking website concept for a Programming for Business group project, inspired by Traveloka. I led the team through discussion and task division, and built the high-fidelity Figma prototype.",
    gallery: [
      {
        src: "/projects/nusantaratrip/destinations.webp",
        caption:
          "Destinations page: search, filter chips, and picks across domestic, international, and local tourism.",
        width: 606,
        height: 2000,
      },
      {
        src: "/projects/nusantaratrip/about.webp",
        caption: "About page: the brand story, mission, values, and timeline.",
        width: 592,
        height: 2000,
      },
      {
        src: "/projects/nusantaratrip/login.webp",
        caption: "Login screen.",
        width: 2000,
        height: 1357,
      },
    ],
  },
  {
    title: "CARE Engine, B-Startion 2026",
    image: "/projects/bstartion-cover.jpg",
    href: "https://docs.google.com/document/d/15vJH76YL5JaT0ogghRxbjsvSEknsbikM_j2LONxVAM4/edit?usp=sharing",
    description:
      "A national business case competition (B-Startion, BINUS) for Mandaya Royal Hospital: my team built CARE, an AI layer that keeps the hospital's systems in sync after a patient leaves. I worked on the Connect pillar, linking three disconnected patient records without a costly system overhaul. Semifinalist, top 10 of 90 teams nationally.",
    gallery: [
      {
        src: "/projects/bstartion/cover-full.webp",
        caption: "Cover, presented by team CONQUERORS.",
        width: 1414,
        height: 2000,
      },
      {
        src: "/projects/bstartion/connect-pillar.webp",
        caption:
          "The Connect pillar: PatientHub, a lightweight bridge linking three separate hospital systems around one shared patient ID.",
        width: 900,
        height: 1272,
      },
      {
        src: "/projects/bstartion/app-ui-mockups.png",
        caption:
          "App mockups for #SejutaLangkahMandaya, the patient step-tracking and rewards feature.",
        width: 900,
        height: 1272,
      },
    ],
  },
];
