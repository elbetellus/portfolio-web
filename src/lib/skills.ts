import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Database,
  Workflow,
  Briefcase,
  Code2,
  FileSpreadsheet,
  ChartColumn,
  ChartNoAxesCombined,
  Server,
  Coffee,
  Files,
  Palette,
} from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import {
  siPython,
  siMysql,
  siPostgresql,
  siDiagramsdotnet,
  siVisualparadigm,
  siLucid,
  siJavascript,
  siTypescript,
  siC,
  siReact,
  siTailwindcss,
  siSupabase,
  siCloudflareworkers,
} from "simple-icons";

export type AccentColor =
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5"
  | "chart-6";

export interface HardSkill {
  title: string;
  description: string;
  icon: LucideIcon;
  color: AccentColor;
}

export const hardSkills: HardSkill[] = [
  {
    title: "Data Analysis & Visualization",
    description:
      "Building KPI dashboards and exploratory reports with Power BI, Tableau, and Excel, including Power Query, Pivot Tables, and DAX measures.",
    icon: BarChart3,
    color: "chart-1",
  },
  {
    title: "Data Modeling & Databases",
    description:
      "Designing ERDs, writing SQL and PL/SQL, and building databases with Oracle APEX, MySQL, and PostgreSQL.",
    icon: Database,
    color: "chart-2",
  },
  {
    title: "Systems & Process Modeling",
    description:
      "Mapping business processes and system logic into UML and ERD diagrams using Draw.io, Visual Paradigm, and Lucidchart.",
    icon: Workflow,
    color: "chart-3",
  },
  {
    title: "Business Analysis",
    description:
      "Turning a market problem into a proposal: root cause and issue tree analysis, SWOT/TOWS, financial projections, and competitor analysis, from BCA's national business case competition to B-Startion.",
    icon: Briefcase,
    color: "chart-6",
  },
  {
    title: "Software Development",
    description:
      "Programming in Python, Java, and JavaScript/TypeScript, and shipping full-stack apps with React, Tailwind CSS, and Supabase.",
    icon: Code2,
    color: "chart-4",
  },
  {
    title: "Productivity & Reporting",
    description:
      "Putting analysis into reports and presentations with Microsoft Office and Canva.",
    icon: FileSpreadsheet,
    color: "chart-5",
  },
];

export interface SoftSkill {
  title: string;
  description: string;
}

export const softSkills: SoftSkill[] = [
  {
    title: "Communication",
    description:
      "Explaining technical material clearly: teaching Data Structures, NLP, Database Technology, and five other computer science courses as a Laboratory Assistant.",
  },
  {
    title: "Business Problem Solving",
    description:
      "Turning root causes into a strategy backed by data and interviews, from BINUS's B-Startion national business case competition (top 10 of 90 teams) to daily decisions at Olahan Mama Cerdas.",
  },
  {
    title: "Ownership & Initiative",
    description:
      "Building and maintaining Olahan Mama Cerdas's inventory and sales system end to end, for a real family business, not a class assignment.",
  },
  {
    title: "Practical Judgment",
    description:
      "Cutting a profit-loss report I had already built, once the data showed nobody was using it. I'd rather ship what's needed than defend what's already built.",
  },
];

/** A tool's badge icon: either a real brand mark (simple-icons) or a generic
 * lucide fallback for brands without a public SVG mark, tinted to a
 * representative brand color. */
export type ToolIcon =
  | { kind: "brand"; icon: SimpleIcon }
  | { kind: "lucide"; icon: LucideIcon; hex: string };

export interface SoftwareTool {
  name: string;
  icon: ToolIcon;
}

export interface SoftwareSkillGroup {
  category: string;
  tools: SoftwareTool[];
  description: string;
}

export const softwareSkillGroups: SoftwareSkillGroup[] = [
  {
    category: "Data & Business Intelligence",
    tools: [
      { name: "MS Excel", icon: { kind: "lucide", icon: FileSpreadsheet, hex: "#217346" } },
      { name: "Power BI", icon: { kind: "lucide", icon: ChartColumn, hex: "#F2C811" } },
      { name: "Tableau", icon: { kind: "lucide", icon: ChartNoAxesCombined, hex: "#E97627" } },
      { name: "Python", icon: { kind: "brand", icon: siPython } },
    ],
    description:
      "Excel, Power BI, and Tableau for dashboards and analysis. Python for data cleaning and preparation.",
  },
  {
    category: "Database & Query",
    tools: [
      { name: "SQL", icon: { kind: "lucide", icon: Database, hex: "#64748B" } },
      { name: "Oracle APEX", icon: { kind: "lucide", icon: Server, hex: "#C74634" } },
      { name: "MySQL", icon: { kind: "brand", icon: siMysql } },
      { name: "Oracle Data Modeler", icon: { kind: "lucide", icon: Workflow, hex: "#C74634" } },
      { name: "PostgreSQL", icon: { kind: "brand", icon: siPostgresql } },
    ],
    description:
      "SQL for querying, Oracle APEX for low-code apps, and Oracle Data Modeler and PostgreSQL for database design.",
  },
  {
    category: "Systems & Process Modeling",
    tools: [
      { name: "Draw.io", icon: { kind: "brand", icon: siDiagramsdotnet } },
      { name: "Visual Paradigm", icon: { kind: "brand", icon: siVisualparadigm } },
      { name: "Lucidchart", icon: { kind: "brand", icon: siLucid } },
    ],
    description:
      "Draw.io, Visual Paradigm, and Lucidchart for ERDs, UML, and business process diagrams.",
  },
  {
    category: "Programming & Web",
    tools: [
      { name: "Java", icon: { kind: "lucide", icon: Coffee, hex: "#ED8B00" } },
      { name: "JavaScript", icon: { kind: "brand", icon: siJavascript } },
      { name: "TypeScript", icon: { kind: "brand", icon: siTypescript } },
      { name: "C", icon: { kind: "brand", icon: siC } },
      { name: "React", icon: { kind: "brand", icon: siReact } },
      { name: "Tailwind CSS", icon: { kind: "brand", icon: siTailwindcss } },
      { name: "Supabase", icon: { kind: "brand", icon: siSupabase } },
      { name: "Cloudflare Workers", icon: { kind: "brand", icon: siCloudflareworkers } },
    ],
    description:
      "Core programming in Java, JavaScript/TypeScript, and C. React, Tailwind CSS, Supabase, and Cloudflare Workers for the apps I've shipped.",
  },
  {
    category: "Productivity & Design",
    tools: [
      { name: "Microsoft Office", icon: { kind: "lucide", icon: Files, hex: "#5059C9" } },
      { name: "Canva", icon: { kind: "lucide", icon: Palette, hex: "#00C4CC" } },
    ],
    description:
      "Microsoft Office for reports and documentation, Canva for visuals.",
  },
];
