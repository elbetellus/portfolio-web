"use client";

import { useRef, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { CornerMarks } from "@/components/site/corner-marks";

export const mono = { fontFamily: "var(--font-plex-mono), ui-monospace, monospace" } as const;

export const C = {
  stroke: "var(--diagram-stroke)",
  faint: "var(--diagram-stroke-faint)",
  node: "var(--diagram-node-bg)",
  flow: "var(--diagram-flow)",
  signal: "var(--diagram-signal)",
  pass: "var(--diagram-pass)",
  block: "var(--diagram-block)",
  text: "var(--diagram-text)",
  fg: "var(--foreground)",
  bg: "var(--background)",
} as const;

/**
 * Shared state for animated diagrams: `live` is true while the diagram is on screen
 * and motion is allowed. Loops mount only while live, so they restart from the
 * beginning each time the reader scrolls back and cost nothing off screen.
 */
export function useDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion() ?? false;
  return { ref, live: inView && !reduce, seen: seen || reduce, reduce };
}

export function DiagramFrame({
  title,
  caption,
  children,
  frameRef,
  minWidth = 640,
}: {
  title: string;
  caption: string;
  children: ReactNode;
  frameRef: React.RefObject<HTMLDivElement | null>;
  minWidth?: number;
}) {
  return (
    <figure className="not-prose">
      <div ref={frameRef} className="panel relative overflow-hidden">
        <CornerMarks tone="data" className="inset-2" />
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          <span className="mono-label text-[0.6875rem] text-foreground">{title}</span>
          <span className="mono-label hidden text-[0.625rem] text-muted-foreground sm:inline">Animated diagram</span>
        </div>
        <div className="bp-grid overflow-x-auto px-2 py-4 sm:px-4 sm:py-6">
          <div style={{ minWidth }}>{children}</div>
        </div>
      </div>
      <figcaption className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
