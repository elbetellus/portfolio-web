import type { Img, Stat } from "./types";

export const profile = {
  name: "Yosua Elbetellus",
  firstName: "Yosua",
  initials: "YE",
  headline: "Information Systems student, Business Intelligence",
  location: "Alam Sutera, Tangerang, Indonesia",
  locationShort: "Tangerang, ID",
  email: "elbetellus@gmail.com",
  phoneDisplay: "+62 852 6874 1340",
  whatsapp: "https://wa.me/6285268741340",
  linkedin: "https://www.linkedin.com/in/yosua-elbetellus-5a9073326",
  line: "@elbetelus1",
  cv: "/cv/Yosua-Elbetellus-CV.pdf",
  site: "https://yosuaelbetellus.vercel.app",
  photo: {
    src: "/images/profile.webp",
    width: 800,
    height: 800,
    alt: "Portrait of Yosua Elbetellus",
  } satisfies Img,
};

export const hero = {
  eyebrow: "Information Systems · Business Intelligence",
  lead: "I turn business processes into data models, dashboards, and decisions.",
  sub: "Fifth-semester student at BINUS University with a 3.92 GPA, open to Data, BI, and Business Analyst internships in 2027.",
  availability: "Open to internships in 2027",
};

export const navLinks = [
  { id: "about", label: "About", index: "01" },
  { id: "work", label: "Work", index: "02" },
  { id: "experience", label: "Experience", index: "03" },
  { id: "education", label: "Education", index: "04" },
  { id: "skills", label: "Skills", index: "05" },
  { id: "credentials", label: "Credentials", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
] as const;

export type SectionId = (typeof navLinks)[number]["id"];

export const keyStats: Stat[] = [
  { value: "3.92", label: "GPA out of 4.00", note: "Semester 5 of 8" },
  { value: "Top 5%", label: "Excellent Academic Achievement", note: "School of Information Systems, 2025 and 2026" },
  { value: "8", label: "Courses taught", note: "As Laboratory Assistant" },
  { value: "14", label: "Business rules in the database", note: "OMC stock and cash flow app" },
];

export const about = {
  paragraphs: [
    "I'm an Information Systems student at BINUS University, currently in my fifth semester with a Business Intelligence concentration. For about a year and a half I worked as a part-time Laboratory Assistant, teaching Data Structures, NLP, Database Technology, and other computer science courses to underclassmen.",
    "Most of my work starts from a real business, not a class assignment. My family runs Olahan Mama Cerdas, a frozen food business, and I designed its inventory and cash-flow system, from the database rules to the screens the team uses every day. I like to begin with the business question, then build the model and the measures that answer it correctly, not just once.",
  ],
  now: "Currently collecting data for a sentiment analysis of the Indonesian national team naturalization debate, with Python and the YouTube Data API, for my Big Data Architecture course.",
};

export const principles = [
  {
    title: "Start from a real business question",
    body: "My main app came from a family business that needed it, not from a class prompt.",
  },
  {
    title: "Put rules in the system, not the interface",
    body: "Stock only changes through recorded transactions, and permissions live in the database instead of hidden buttons.",
  },
  {
    title: "Measure each step, not just the end",
    body: "I evaluate pipelines module by module, and I find mistakes by reading failed cases one at a time.",
  },
  {
    title: "Decide what not to build",
    body: "A profit-loss report, a sales role, and a two-scheme reseller model were all dropped after checking they would not help.",
  },
];

export const contact = {
  heading: "Got an internship or a messy dataset in mind?",
  body: "I'm looking for internships in Data Analysis, Business Intelligence, and Business Analysis. Reach out through whichever of these you check most often.",
  availability: "Available for internships starting in 2027 (semesters 6 and 7).",
};
