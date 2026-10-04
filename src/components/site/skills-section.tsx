import { Sparkles } from "lucide-react";
import { skillGroups, softSkills } from "@/content/skills";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ToolIcon } from "./tool-icon";
import { MiniDashboard, MiniStack } from "./skill-illustrations";

const illustrations: Partial<Record<string, () => React.JSX.Element>> = { "S-01": MiniDashboard, "S-06": MiniStack };

const spans: Record<string, string> = {
  "S-01": "lg:col-span-2",
  "S-06": "lg:col-span-2",
};

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="Skills"
          title={<span id="skills-title">Grouped by what they are for.</span>}
          intro="Tools only matter for the job they do, so they are grouped by purpose. Web app skills are labeled as AI-assisted, because that is how I built them."
          annotation="Sheet 05 / 07"
        />

        <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {skillGroups.map((g) => {
            const Illustration = illustrations[g.code];
            return (
              <RevealItem
                as="li"
                key={g.code}
                className={cn("panel group relative flex flex-col p-6 sm:p-7", spans[g.code])}
              >
                <div className={cn(Illustration && "sm:grid sm:grid-cols-[1fr_auto] sm:gap-8")}>
                  <div className="flex min-w-0 flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-signal-text">{g.code}</span>
                      {g.aiAssisted ? (
                        <span className="mono-label inline-flex items-center gap-1.5 rounded-[var(--tag-radius)] border border-[color-mix(in_oklab,var(--signal)_50%,transparent)] px-2 py-1 text-[0.6875rem] text-signal-text">
                          <Sparkles aria-hidden className="size-3" />
                          AI-assisted
                        </span>
                      ) : null}
                    </div>
                    <h3 className="font-display mt-6 text-xl leading-snug font-semibold">{g.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{g.detail}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {g.tools.map((t) => (
                        <li
                          key={t}
                          className="flex items-center gap-2 rounded-[var(--tag-radius)] border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2.5 py-1.5 text-[0.8125rem] text-foreground/90 transition-colors duration-200 hover:border-data hover:text-foreground"
                        >
                          <ToolIcon name={t} className="size-3.5 text-data" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {Illustration ? (
                    <div className="hidden items-center sm:flex">
                      <Illustration />
                    </div>
                  ) : null}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-20">
          <h3 className="mono-label flex items-center gap-3 text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-line" />
            Soft skills, with the evidence
          </h3>
        </Reveal>
        <RevealGroup as="ul" className="mt-8 grid border-t border-border md:grid-cols-2">
          {softSkills.map((s, i) => (
            <RevealItem
              as="li"
              key={s.title}
              className={cn(
                "grid gap-2 border-b border-border py-6 sm:grid-cols-[180px_1fr] sm:gap-6 md:pr-8",
                i % 2 === 1 && "md:border-l md:pl-8",
              )}
            >
              <span className="font-display text-lg font-semibold">{s.title}</span>
              <span className="text-[0.975rem] leading-relaxed text-muted-foreground">{s.evidence}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
