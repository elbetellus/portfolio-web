import type { LucideIcon } from "lucide-react";
import {
  ChartColumn,
  ChartNoAxesCombined,
  Database,
  FileSpreadsheet,
  Files,
  GitFork,
  Grid2x2,
  Palette,
  Server,
  Sigma,
  Swords,
  Table,
  TrendingUp,
  Workflow,
} from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import {
  siC,
  siCloudflareworkers,
  siCss,
  siDiagramsdotnet,
  siFigma,
  siHtml5,
  siJavascript,
  siLucid,
  siMysql,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVisualparadigm,
} from "simple-icons";

const brand: Record<string, SimpleIcon> = {
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  "Draw.io": siDiagramsdotnet,
  "Visual Paradigm": siVisualparadigm,
  Lucidchart: siLucid,
  Python: siPython,
  Java: siOpenjdk,
  C: siC,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  HTML: siHtml5,
  CSS: siCss,
  React: siReact,
  "Tailwind CSS": siTailwindcss,
  Supabase: siSupabase,
  "Cloudflare Workers": siCloudflareworkers,
  Figma: siFigma,
};

const generic: Record<string, LucideIcon> = {
  Excel: FileSpreadsheet,
  "Power Query": Workflow,
  "Power Pivot": Table,
  DAX: Sigma,
  "Power BI": ChartColumn,
  Tableau: ChartNoAxesCombined,
  SQL: Database,
  "Oracle PL/SQL": Database,
  "Oracle APEX": Server,
  "Oracle Data Modeler": Workflow,
  "Issue trees": GitFork,
  "SWOT/TOWS": Grid2x2,
  "Competitor analysis": Swords,
  "Financial projection": TrendingUp,
  "Microsoft Office": Files,
  Canva: Palette,
};

/** Monochrome tool glyph: the brand mark when one is published, otherwise a generic icon. */
export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const b = brand[name];
  if (b) {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d={b.path} />
      </svg>
    );
  }
  const G = generic[name] ?? Database;
  return <G aria-hidden className={className} />;
}
