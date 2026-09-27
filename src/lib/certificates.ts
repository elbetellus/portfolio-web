export interface Certificate {
  title: string;
  subtitle?: string;
  issuer: string;
  date: string;
  /** Thumbnail shown on the card. Falls back to a generic icon when absent. */
  image?: string;
  /** What the card links to when clicked. */
  file?: string;
  fileType?: "image" | "pdf";
  note?: string;
}

export const certificates: Certificate[] = [
  {
    title: "Applied Database Systems using Oracle AI Database",
    subtitle: "Award of Completion",
    issuer: "Oracle Academy",
    date: "Jun 24, 2026",
    image: "/certificates/oracle-database-systems.jpg",
    file: "/certificates/oracle-database-systems.pdf",
    fileType: "pdf",
  },
  {
    title: "Best Assistant Lab Software",
    subtitle: "Signed by the Rector",
    issuer: "BINUS University",
    date: "Jun 12, 2026",
    file: "/certificates/best-assistant-lab-software.jpg",
    fileType: "image",
  },
  {
    title: "Best Performing Part-Time Assistant",
    subtitle: "Odd Semester 2025/2026",
    issuer: "BINUS University",
    date: "Jan 7, 2026",
    file: "/certificates/best-performing-part-time-assistant.jpg",
    fileType: "image",
  },
  {
    title: "Certificate of Appreciation: Excellent Academic Achievement",
    subtitle: "Top 5% of Information Systems students, min. GPA 3.75",
    issuer: "BINUS University",
    date: "Jun 10, 2026",
    file: "/certificates/sis-2026.jpg",
    fileType: "image",
  },
  {
    title: "Certificate of Appreciation: Excellent Academic Achievement",
    subtitle: "Top 5% of Information Systems students, min. GPA 3.75",
    issuer: "BINUS University",
    date: "Jun 17, 2025",
    file: "/certificates/sis-2025.jpg",
    fileType: "image",
  },
  {
    title: "Exploring SAP Analytics Cloud for Analytics",
    subtitle: "Workshop, Participant",
    issuer: "BINUS University",
    date: "May 11, 2025",
    file: "/certificates/sap-analytics-cloud.webp",
    fileType: "image",
  },
  {
    title: "Self-Paced Azure AI Basic Fundamental",
    subtitle: "elevAIte Indonesia Program",
    issuer: "Microsoft",
    date: "Mar 28, 2025",
    image: "/certificates/azure-ai-fundamentals.jpg",
    file: "/certificates/azure-ai-fundamentals.pdf",
    fileType: "pdf",
  },
  {
    title: "Semifinalist, B-Startion National Business Case Competition",
    issuer: "BINUS University",
    date: "2026",
    note: "Top 10 of 90 teams nationally",
  },
  {
    title: "3rd Place, National Science Olympiad (OSN)",
    subtitle: "City Level · Informatics/Computer Science",
    issuer: "Puspresnas",
    date: "2023",
  },
  {
    title: "Finalist, National Science Olympiad (OSN)",
    subtitle: "Provincial Level · Informatics/Computer Science",
    issuer: "Puspresnas",
    date: "2023",
  },
  {
    title: "4th Place, PIX ONE",
    subtitle: "City-Level Olympiad · Informatics/Computer Science",
    issuer: "SMA Xaverius",
    date: "2023",
  },
];
