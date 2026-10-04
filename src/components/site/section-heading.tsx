"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { DUR, EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Short annotation printed on the dimension line, like a measurement on a drawing. */
  annotation?: string;
  className?: string;
}

/**
 * Section title styled like a sheet on a technical drawing: index, eyebrow, title,
 * and a dimension line that draws itself in when the section arrives.
 */
export function SectionHeading({ index, eyebrow, title, intro, annotation, className }: SectionHeadingProps) {
  return (
    <header className={cn("mb-12 md:mb-16", className)}>
      <motion.div
        className="mono-label flex items-center gap-3 text-muted-foreground"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DUR.medium, ease: EASE_OUT }}
      >
        <span className="text-signal-text">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line" />
        <span>{eyebrow}</span>
      </motion.div>

      <motion.h2
        className="font-display mt-5 max-w-4xl text-[clamp(2.1rem,1.35rem+3vw,3.75rem)] leading-[1.02] font-semibold"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DUR.long, ease: EASE_OUT, delay: 0.05 }}
      >
        {title}
      </motion.h2>

      {intro ? (
        <motion.p
          className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: DUR.long, ease: EASE_OUT, delay: 0.12 }}
        >
          {intro}
        </motion.p>
      ) : null}

      <DimensionLine annotation={annotation} className="mt-8" />
    </header>
  );
}

/** A horizontal measurement line with end ticks and arrowheads; draws left to right. */
export function DimensionLine({ annotation, className }: { annotation?: string; className?: string }) {
  return (
    <div aria-hidden className={cn("relative h-4 text-line", className)}>
      <motion.div
        className="absolute inset-x-0 top-1/2 h-px origin-left bg-current"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DUR.draw, ease: EASE_OUT, delay: 0.15 }}
      />
      <span className="absolute top-0 left-0 h-4 w-px bg-current" />
      <motion.span
        className="absolute top-0 right-0 h-4 w-px bg-current"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DUR.short, delay: 1.2 }}
      />
      {annotation ? (
        <motion.span
          className="mono-label absolute top-1/2 right-6 -translate-y-1/2 bg-background px-2 text-[0.6875rem] text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: DUR.medium, delay: 1 }}
        >
          {annotation}
        </motion.span>
      ) : null}
    </div>
  );
}
