import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";
import { RevealGroup, RevealItem } from "./reveal";
import { SectionHeading } from "./section-heading";

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-7", "lg:col-span-5", "md:col-span-2 lg:col-span-12"];

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="Work"
          title={<span id="work-title">Selected work, with the reasoning behind it.</span>}
          intro="Five projects. Each case study covers what I built, the decision that mattered, the results, and the limits."
          annotation="Sheet 02 / 07"
        />

        <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {projects.map((p, i) => (
            <RevealItem key={p.slug} className={spans[i]}>
              <ProjectCard project={p} layout={i === projects.length - 1 ? "wide" : "stack"} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
