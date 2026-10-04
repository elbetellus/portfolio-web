"use client";

import type { DiagramKind } from "@/content/projects";
import { CareDiagram } from "./care-diagram";
import { CrimeDiagram } from "./crime-diagram";
import { NotaDiagram } from "./nota-diagram";
import { OmcDiagram } from "./omc-diagram";

export function ProjectDiagram({ kind, title, caption }: { kind: DiagramKind; title: string; caption: string }) {
  switch (kind) {
    case "omc":
      return <OmcDiagram title={title} caption={caption} />;
    case "nota":
      return <NotaDiagram title={title} caption={caption} />;
    case "crime":
      return <CrimeDiagram title={title} caption={caption} />;
    case "care":
      return <CareDiagram title={title} caption={caption} />;
  }
}
