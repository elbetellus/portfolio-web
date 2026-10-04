import type { Img } from "./types";

export interface Certificate {
  title: string;
  subtitle: string;
  issuer: string;
  date: string;
  image: Img;
  pdf?: string;
}

const cert = (src: string, width: number, height: number, alt: string): Img => ({ src, width, height, alt });

export const certificates: Certificate[] = [
  {
    title: "Applied Database Systems using Oracle AI Database",
    subtitle: "Award of Completion",
    issuer: "Oracle Academy",
    date: "Jun 24, 2026",
    image: cert("/certificates/oracle-database-systems.jpg", 1980, 1530, "Oracle Academy certificate"),
    pdf: "/certificates/oracle-database-systems.pdf",
  },
  {
    title: "Best Assistant Lab Software",
    subtitle: "Signed by the Rector",
    issuer: "BINUS University",
    date: "Jun 12, 2026",
    image: cert("/certificates/best-assistant-lab-software.jpg", 1238, 875, "Best Assistant Lab Software certificate"),
  },
  {
    title: "Excellent Academic Achievement 2026",
    subtitle: "Top 5% of Information Systems students, minimum GPA 3.75",
    issuer: "BINUS University",
    date: "Jun 10, 2026",
    image: cert("/certificates/sis-2026.jpg", 1215, 847, "Excellent Academic Achievement 2026 certificate"),
  },
  {
    title: "Best Performing Part-Time Assistant",
    subtitle: "Odd Semester 2025/2026, Laboratory Center",
    issuer: "BINUS University",
    date: "Jan 7, 2026",
    image: cert("/certificates/best-performing-part-time-assistant.jpg", 1207, 856, "Best Performing Part-Time Assistant certificate"),
  },
  {
    title: "Excellent Academic Achievement 2025",
    subtitle: "Top 5% of Information Systems students, minimum GPA 3.75",
    issuer: "BINUS University",
    date: "Jun 17, 2025",
    image: cert("/certificates/sis-2025.jpg", 1232, 865, "Excellent Academic Achievement 2025 certificate"),
  },
  {
    title: "Exploring SAP Analytics Cloud for Analytics",
    subtitle: "Workshop, Participant",
    issuer: "BINUS University",
    date: "May 11, 2025",
    image: cert("/certificates/sap-analytics-cloud.webp", 1491, 1055, "SAP Analytics Cloud workshop certificate"),
  },
  {
    title: "Self-Paced Azure AI Basic Fundamental",
    subtitle: "elevAIte Indonesia Program",
    issuer: "Microsoft",
    date: "Mar 28, 2025",
    image: cert("/certificates/azure-ai-fundamentals.jpg", 2105, 1490, "Microsoft Azure AI fundamentals certificate"),
    pdf: "/certificates/azure-ai-fundamentals.pdf",
  },
];

export const honors = [
  { title: "Semifinalist, B-Startion National Business Case Competition", issuer: "BINUS University", year: "2026" },
  { title: "3rd Place, National Science Olympiad (OSN), City Level, Informatics", issuer: "Puspresnas", year: "2023" },
  { title: "Finalist, National Science Olympiad (OSN), Provincial Level, Informatics", issuer: "Puspresnas", year: "2023" },
  { title: "4th Place, PIX ONE City-Level Olympiad, Informatics", issuer: "SMA Xaverius", year: "2023" },
];
