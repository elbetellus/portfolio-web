export interface SkillGroup {
  code: string;
  title: string;
  detail: string;
  tools: string[];
  aiAssisted?: boolean;
}

export const skillGroups: SkillGroup[] = [
  {
    code: "S-01",
    title: "Data analysis and visualization",
    detail: "Building KPI dashboards and exploratory reports.",
    tools: ["Excel", "Power Query", "Power Pivot", "DAX", "Power BI", "Tableau"],
  },
  {
    code: "S-02",
    title: "Data modeling and databases",
    detail: "Designing ERDs, writing SQL and PL/SQL, and enforcing rules in the database.",
    tools: ["SQL", "PostgreSQL", "MySQL", "Oracle PL/SQL", "Oracle APEX", "Oracle Data Modeler"],
  },
  {
    code: "S-03",
    title: "Systems and process modeling",
    detail: "UML, ERD, and business process diagrams.",
    tools: ["Draw.io", "Visual Paradigm", "Lucidchart"],
  },
  {
    code: "S-04",
    title: "Business analysis",
    detail: "Root cause and issue tree analysis, SWOT/TOWS, competitor analysis, and financial projections, from case competitions.",
    tools: ["Issue trees", "SWOT/TOWS", "Competitor analysis", "Financial projection"],
  },
  {
    code: "S-05",
    title: "Programming",
    detail: "Python for teaching and data collection, plus the languages I taught and studied.",
    tools: ["Python", "Java", "C", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    code: "S-06",
    title: "Web apps",
    detail: "Two production apps built with Claude Code as pair programmer. The architecture, data model, and business rules were my decisions.",
    tools: ["React", "Tailwind CSS", "Supabase", "Cloudflare Workers"],
    aiAssisted: true,
  },
  {
    code: "S-07",
    title: "Productivity",
    detail: "Reports and presentations.",
    tools: ["Microsoft Office", "Canva", "Figma"],
  },
];

export const softSkills = [
  {
    title: "Communication",
    evidence: "Explaining technical material clearly, shown by teaching eight computer science courses as a Laboratory Assistant.",
  },
  {
    title: "Business problem solving",
    evidence: "Turning root causes into a strategy backed by data, in the B-Startion case competition and in daily decisions at the family business.",
  },
  {
    title: "Ownership and initiative",
    evidence: "Designing and maintaining the inventory and cash-flow system of a family business end to end.",
  },
  {
    title: "Practical judgment",
    evidence: "Deciding not to build a profit-loss report once it was clear it would only restate a number the owner already knew.",
  },
];
