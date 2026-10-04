import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { CornerMarks } from "./corner-marks";
import { StatusChip } from "./status-chip";

export function ProjectCard({
  project,
  layout = "stack",
  priority = false,
  className,
}: {
  project: Project;
  layout?: "stack" | "wide";
  priority?: boolean;
  className?: string;
}) {
  const wide = layout === "wide";
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className={cn(
        "group panel relative flex h-full flex-col overflow-hidden transition-[border-color,box-shadow,translate] duration-300 ease-out hover:-translate-y-1 hover:border-border-strong focus-visible:-translate-y-1",
        wide && "lg:grid lg:grid-cols-12",
        className,
      )}
    >
      <CornerMarks interactive className="z-10 inset-2" />

      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden border-b border-border bg-muted lg:aspect-auto lg:h-[300px]",
          wide && "lg:col-span-7 lg:h-auto lg:min-h-[340px] lg:border-r lg:border-b-0",
        )}
      >
        <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority={priority}
            sizes={wide ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 680px, (min-width: 768px) 50vw, 100vw"}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        </ViewTransition>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_oklab,var(--background)_70%,transparent)] via-transparent to-transparent"
        />
        {/* Inspection scan line on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:animate-[scan_1.4s_var(--ease-in-out)_1]"
        >
          <span className="block h-px bg-data shadow-[0_0_14px_2px_var(--data)]" />
        </span>
        <span className="mono-label absolute top-3 left-3 rounded-[var(--tag-radius)] border border-border bg-[color-mix(in_oklab,var(--background)_80%,transparent)] px-2 py-1 text-[0.6875rem] text-foreground backdrop-blur-sm">
          {project.code}
        </span>
        <StatusChip status={project.status} className="absolute top-3 right-3" />
      </div>

      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", wide && "lg:col-span-5 lg:p-8")}>
        <p className="mono-label text-[0.6875rem] text-muted-foreground">
          {project.kind}
          {project.year ? <span className="text-line"> · {project.year}</span> : null}
        </p>
        <h3 className="font-display mt-3 text-[1.45rem] leading-tight font-semibold text-balance sm:text-[1.6rem]">
          {project.title}
        </h3>
        <p className="mt-3 max-w-prose text-[0.975rem] leading-relaxed text-muted-foreground">{project.cardSummary}</p>
        <p className="mt-2 text-sm text-muted-foreground/80">{project.team}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-7">
          <div>
            <span className="font-display block text-3xl leading-none font-bold text-signal-text">
              {project.cardMetric.value}
            </span>
            <span className="mt-1.5 block text-[0.8125rem] text-muted-foreground">{project.cardMetric.label}</span>
          </div>
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <span className="hidden sm:inline">Case study</span>
            <span className="grid size-10 place-items-center rounded-full border border-border-strong transition-[background-color,border-color,color] duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-primary-foreground">
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
