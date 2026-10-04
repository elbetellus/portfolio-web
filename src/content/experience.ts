import type { Img } from "./types";

export interface ExperienceEntry {
  id: string;
  period: string;
  organization: string;
  role: string;
  summary: string;
  bullets: string[];
  chips?: string[];
  awards?: string[];
  photos: Img[];
}

const photo = (src: string, width: number, height: number, alt: string): Img => ({
  src,
  width,
  height,
  alt,
});

export const experience: ExperienceEntry[] = [
  {
    id: "lab-assistant",
    period: "Feb 2025 to Aug 2026",
    organization: "BINUS University, School of Information Systems",
    role: "Laboratory Assistant",
    summary: "Taught and guided undergraduate lab sessions across eight computer science courses.",
    chips: [
      "Data Structures",
      "Algorithms and Programming",
      "Database Technology",
      "Computer Vision",
      "Natural Language Processing",
      "Computational Biology",
      "Scientific Computing",
      "Machine Learning",
    ],
    bullets: [
      "Sustained a class pass rate above 60% and a training score above 70%, with perfect attendance, and regularly covered sessions for other assistants.",
      "Noticed a student in a Data Structures lecture could not see the whiteboard from their seat, and re-taught Linked List operations one-on-one with hand-drawn diagrams until they could implement insert and search independently.",
      "Co-organized a voluntary quiz-prep session for Database Technology that drew about 80% attendance despite only half being required.",
    ],
    awards: [
      "Best Performing Part-Time Assistant, Odd Semester 2025/2026",
      "Best Assistant Lab Software, signed by the Rector",
    ],
    photos: [
      photo("/experience/lab-assistant-gathering-1.webp", 1477, 1108, "Laboratory assistants gathering"),
      photo("/experience/lab-assistant-gathering-2.jpg", 1477, 1108, "Laboratory assistants group photo"),
      photo("/experience/lab-assistant-gathering-3.jpg", 1906, 858, "Laboratory assistants event"),
    ],
  },
  {
    id: "freshmen-leader",
    period: "Aug 2025",
    organization: "BINUS University, New Student Orientation",
    role: "Freshmen Leader",
    summary: "Led the orientation program for about 400 incoming Information Systems students.",
    bullets: [
      "Managed meal logistics for the week and tracked attendance across every session.",
    ],
    photos: [
      photo("/experience/freshmen-leader-1.jpg", 1280, 960, "Freshmen orientation session"),
      photo("/experience/freshmen-leader-2.jpg", 2000, 1500, "Freshmen leaders with new students"),
      photo("/experience/freshmen-leader-3.jpg", 2000, 1125, "Orientation hall"),
      photo("/experience/freshmen-leader-4.jpg", 900, 1600, "Freshmen leader portrait"),
      photo("/experience/freshmen-leader-5.jpg", 2000, 1500, "Orientation group activity"),
      photo("/experience/freshmen-leader-6.jpg", 1500, 2000, "Orientation team"),
    ],
  },
  {
    id: "freshmen-partner",
    period: "Sep 2025 to Jun 2026",
    organization: "BINUS University",
    role: "Freshmen Partner",
    summary: "Mentored a peer group of seven new students through their first semesters.",
    bullets: [
      "Led the EESE sustainability program's tree-planting initiative, aligned with the UN Sustainable Development Goals: about 50 trees planted with about 15 classmates.",
      "Ran weekly sessions covering campus orientation and helped troubleshoot academic difficulties.",
    ],
    photos: [
      photo("/experience/freshmen-partner-1.jpg", 2000, 1500, "Tree planting activity"),
      photo("/experience/freshmen-partner-2.jpg", 1280, 960, "Freshmen partner group session"),
      photo("/experience/freshmen-partner-4.jpg", 1080, 947, "Freshmen partner group photo"),
    ],
  },
];

export const communityService = {
  title: "Community service, BINUS Character Building",
  items: [
    { term: "Semester 1", text: "Taught at SMP Al Mubarok." },
    { term: "Semester 2", text: "Community research on the effects of the Bantargebang waste facility on nearby residents." },
    { term: "Semester 3", text: "Helped a small business set up its Google Maps listing and designed its promotional banner." },
    { term: "Semester 4", text: "Tree planting, the same activity as the EESE initiative above." },
  ],
};
