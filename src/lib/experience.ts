export type AccentColor = "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5" | "chart-6";

export interface ExperienceEntry {
  period: string;
  organization: string;
  role: string;
  bullets: string[];
  color: AccentColor;
  /** Optional supporting photos; most of these roles don't have any left. */
  photos?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    period: "Feb 2025 to Aug 2026",
    organization: "BINUS University",
    role: "Laboratory Assistant, School of Information Systems",
    color: "chart-1",
    bullets: [
      "Taught and guided lab sessions across eight courses: Data Structures, Algorithms and Programming, Database Technology, Computer Vision, Natural Language Processing, Computational Biology, Scientific Computing, and Machine Learning.",
      "Sustained a class pass rate above 60% and a training score above 70%, with perfect attendance, and regularly covered sessions for other assistants.",
      "Noticed a student in a Data Structures lecture couldn't see the whiteboard from their seat, and re-taught Linked List operations one-on-one with hand-drawn diagrams until they could implement insert and search independently.",
      "Co-organized a voluntary quiz-prep session for Database Technology that drew about 80% attendance despite only half being required.",
    ],
    photos: [
      "/experience/lab-assistant-gathering-1.webp",
      "/experience/lab-assistant-gathering-2.jpg",
      "/experience/lab-assistant-gathering-3.jpg",
    ],
  },
  {
    period: "Aug 2025",
    organization: "BINUS University",
    role: "Freshmen Leader, New Student Orientation",
    color: "chart-3",
    bullets: [
      "Led the orientation program for about 400 incoming Information Systems students, managing meal logistics and tracking attendance across every session.",
    ],
    photos: [
      "/experience/freshmen-leader-1.jpg",
      "/experience/freshmen-leader-2.jpg",
      "/experience/freshmen-leader-3.jpg",
      "/experience/freshmen-leader-4.jpg",
      "/experience/freshmen-leader-5.jpg",
      "/experience/freshmen-leader-6.jpg",
    ],
  },
  {
    period: "Sep 2025 to Jun 2026",
    organization: "BINUS University",
    role: "Freshmen Partner",
    color: "chart-4",
    bullets: [
      "Led the EESE sustainability program's tree-planting initiative, aligned with the UN Sustainable Development Goals.",
      "Ran weekly sessions for a peer group of seven students, covering campus orientation and helping troubleshoot academic difficulties through their first semesters.",
    ],
    photos: [
      "/experience/freshmen-partner-1.jpg",
      "/experience/freshmen-partner-2.jpg",
      "/experience/freshmen-partner-4.jpg",
    ],
  },
];
