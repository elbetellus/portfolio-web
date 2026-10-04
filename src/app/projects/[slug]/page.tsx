import { ViewTransition } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Download, FileText, Globe, PenTool } from "lucide-react";
import { getAdjacentProjects, getProject, projects, type Project } from "@/content/projects";
import type { LinkItem } from "@/content/types";
import { ProjectDiagram } from "@/components/diagrams/project-diagram";
import { actionClass } from "@/components/site/action";
import { CaseGallery } from "@/components/site/case-gallery";
import { CornerMarks } from "@/components/site/corner-marks";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { StatusChip } from "@/components/site/status-chip";

const directional = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.cardSummary,
    openGraph: { title: project.title, description: project.cardSummary, images: [{ url: project.cover.src }] },
  };
}

const linkIcon: Record<LinkItem["kind"], typeof Globe> = {
  live: Globe,
  file: Download,
  doc: FileText,
  figma: PenTool,
};

function sectionsFor(p: Project) {
  return [
    p.problem && { id: "problem", label: "The problem" },
    p.howItWorks && { id: "how", label: "How it works" },
    p.diagram && { id: "diagram", label: "Diagram" },
    { id: "built", label: p.built.heading },
    p.decision && { id: "decision", label: "Key decision" },
    p.results && { id: "results", label: "Results" },
    p.learned && { id: "learned", label: "What I learned" },
    { id: "limits", label: "Limits" },
    { id: "gallery", label: "Figures" },
  ].filter(Boolean) as { id: string; label: string }[];
}

function Block({ id, index, title, children }: { id: string; index: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-border pt-10 pb-14 first:border-t-0 first:pt-0">
      <Reveal>
        <h2 id={`${id}-title`} className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-signal-text">{String(index).padStart(2, "0")}</span>
          <span className="font-display text-2xl font-semibold sm:text-[1.75rem]">{title}</span>
        </h2>
      </Reveal>
      <div className="mt-7">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { next } = getAdjacentProjects(slug);
  const sections = sectionsFor(project);
  const n = (id: string) => sections.findIndex((s) => s.id === id) + 1;

  const spec = [
    { k: "Role", v: project.role },
    { k: "Team", v: project.team },
    { k: "Period", v: project.period },
    { k: "Stack", v: project.stack.join(", ") },
  ];

  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      <article id="top" className="pt-[calc(var(--nav-height)+2.5rem)] pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#work"
            transitionTypes={["nav-back"]}
            className="group mono-label inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>

          <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="mono-label rounded-[var(--tag-radius)] border border-border px-2 py-1 text-[0.6875rem]">
                  {project.code}
                </span>
                <span className="mono-label text-[0.6875rem] text-muted-foreground">{project.kind}</span>
                <StatusChip status={project.status} />
              </div>
              <h1 className="font-display mt-6 text-[clamp(2.4rem,1.5rem+3.8vw,4.5rem)] leading-[1] font-bold">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85 md:text-xl">{project.summary}</p>
              {project.links.length ? (
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {project.links.map((l, i) => {
                    const Icon = linkIcon[l.kind];
                    const external = l.href.startsWith("http");
                    return (
                      <div key={l.href} className="flex flex-col gap-1.5">
                        <a
                          href={l.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noreferrer" : undefined}
                          download={l.kind === "file" ? true : undefined}
                          className={actionClass({ variant: i === 0 ? "primary" : "outline" })}
                        >
                          <Icon />
                          {l.label}
                          {external ? <ArrowUpRight className="opacity-70" /> : null}
                        </a>
                        {l.note ? <span className="text-[0.8125rem] text-muted-foreground">{l.note}</span> : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <dl className="self-end border-t border-l border-border-strong lg:col-span-5">
              {spec.map((s) => (
                <div key={s.k} className="grid grid-cols-[96px_1fr] border-r border-b border-border-strong">
                  <dt className="mono-label border-r border-border-strong px-3 py-3 text-[0.6875rem] text-muted-foreground">
                    {s.k}
                  </dt>
                  <dd className="px-3 py-3 text-[0.9375rem] text-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </header>

          <figure className="mt-14">
            <div className="panel relative overflow-hidden p-2 sm:p-3">
              <CornerMarks tone="signal" className="inset-1" />
              <div
                className="relative w-full overflow-hidden rounded-[calc(var(--radius-m)-4px)] bg-muted"
                style={{ aspectRatio: `${project.cover.width} / ${Math.min(project.cover.height, project.cover.width * 0.62)}` }}
              >
                <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    priority
                    sizes="(min-width: 1280px) 1216px, 100vw"
                    className="object-cover object-top"
                  />
                </ViewTransition>
              </div>
            </div>
            <figcaption className="mono-label mt-3 flex justify-between text-[0.6875rem] text-muted-foreground">
              <span>Fig. 0 / {project.cover.alt}</span>
              <span className="hidden sm:inline">{project.code}</span>
            </figcaption>
          </figure>

          <div className="mt-20 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-[calc(var(--nav-height)+2rem)]">
                <p className="mono-label text-[0.6875rem] text-muted-foreground">On this page</p>
                <ol className="mt-4 space-y-1 border-l border-border">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-signal hover:text-foreground"
                      >
                        <span className="font-mono text-[0.6875rem] text-signal-text/80">{String(i + 1).padStart(2, "0")}</span>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="min-w-0 max-w-3xl">
              {project.problem ? (
                <Block id="problem" index={n("problem")} title="The problem">
                  <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2">
                    {project.problem.map((p, i) => (
                      <RevealItem as="li" key={p} className="rounded-[var(--radius-s)] border border-border bg-[color-mix(in_oklab,var(--card-solid)_50%,transparent)] p-4">
                        <span className="font-mono text-[0.6875rem] text-block">P{i + 1}</span>
                        <p className="mt-2 text-[0.975rem] leading-relaxed text-foreground/90">{p}</p>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </Block>
              ) : null}

              {project.howItWorks ? (
                <Block id="how" index={n("how")} title="How it works">
                  <Reveal>
                    <p className="text-lg leading-relaxed text-foreground/90">{project.howItWorks}</p>
                  </Reveal>
                </Block>
              ) : null}

              {project.diagram ? (
                <Block id="diagram" index={n("diagram")} title="Diagram">
                  <ProjectDiagram kind={project.diagram.kind} title={project.diagram.title} caption={project.diagram.caption} />
                </Block>
              ) : null}

              <Block id="built" index={n("built")} title={project.built.heading}>
                <RevealGroup as="ol" className="space-y-4">
                  {project.built.items.map((b, i) => (
                    <RevealItem as="li" key={b.slice(0, 40)} className="grid grid-cols-[36px_1fr] gap-2">
                      <span className="font-mono pt-1 text-xs text-data">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-[1.0625rem] leading-relaxed text-foreground/90">{b}</p>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </Block>

              {project.decision ? (
                <Block id="decision" index={n("decision")} title="Key decision">
                  <Reveal className="panel relative p-6 sm:p-8">
                    <CornerMarks tone="signal" className="inset-2" />
                    <p className="font-display text-xl font-semibold text-signal-text sm:text-2xl">{project.decision.title}</p>
                    <p className="mt-4 text-[1.0625rem] leading-relaxed text-foreground/90">{project.decision.body}</p>
                  </Reveal>
                </Block>
              ) : null}

              {project.results ? (
                <Block id="results" index={n("results")} title="Results">
                  <RevealGroup as="ul" className="grid grid-cols-2 border-t border-l border-border sm:grid-cols-4">
                    {project.results.map((r) => (
                      <RevealItem as="li" key={r.label} className="border-r border-b border-border p-4 sm:p-5">
                        <span className="font-display block text-3xl leading-none font-bold text-foreground sm:text-4xl">{r.value}</span>
                        <span className="mt-2 block text-sm text-muted-foreground">{r.label}</span>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                  {project.resultNotes ? (
                    <ul className="mt-6 space-y-3">
                      {project.resultNotes.map((note) => (
                        <li key={note} className="relative pl-5 text-[1rem] leading-relaxed text-muted-foreground">
                          <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2.5 bg-data" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Block>
              ) : null}

              {project.learned ? (
                <Block id="learned" index={n("learned")} title="What I learned">
                  <Reveal>
                    <blockquote className="border-l-2 border-data pl-6">
                      <p className="font-display text-xl font-semibold sm:text-2xl">{project.learned.title}</p>
                      <p className="mt-4 text-[1.0625rem] leading-relaxed text-foreground/90">{project.learned.body}</p>
                    </blockquote>
                  </Reveal>
                </Block>
              ) : null}

              <Block id="limits" index={n("limits")} title="Limits">
                <Reveal className="rounded-[var(--radius-m)] border border-dashed border-border-strong p-5 sm:p-6">
                  <p className="mono-label text-[0.6875rem] text-signal-text">Known limits</p>
                  <ul className="mt-4 space-y-3">
                    {project.limits.map((l) => (
                      <li key={l} className="relative pl-5 text-[1rem] leading-relaxed text-foreground/90">
                        <span aria-hidden className="absolute top-[0.55em] left-0 size-1.5 rotate-45 border border-signal" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </Block>

              <Block id="gallery" index={n("gallery")} title="Figures">
                <CaseGallery images={project.gallery} title={project.title} />
              </Block>
            </div>
          </div>

          <Reveal className="mt-10">
            <Link
              href={`/projects/${next.slug}`}
              transitionTypes={["nav-forward"]}
              className="group panel relative flex flex-col gap-6 overflow-hidden p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <CornerMarks interactive className="inset-2" />
              <div>
                <p className="mono-label text-[0.6875rem] text-muted-foreground">Next project · {next.code}</p>
                <p className="font-display mt-3 text-2xl font-semibold sm:text-3xl">{next.title}</p>
                <p className="mt-2 max-w-xl text-muted-foreground">{next.cardSummary}</p>
              </div>
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-border-strong transition-[background-color,border-color,color] duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-primary-foreground">
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </Link>
          </Reveal>
        </div>
      </article>
    </ViewTransition>
  );
}
