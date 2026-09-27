import { SkillCard } from "@/components/skill-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import {
  hardSkills,
  softSkills,
  softwareSkillGroups,
  type SoftwareTool,
} from "@/lib/skills";

function toolBadge(tool: SoftwareTool) {
  const hex = tool.icon.kind === "brand" ? `#${tool.icon.icon.hex}` : tool.icon.hex;
  const iconNode =
    tool.icon.kind === "brand" ? (
      <svg viewBox="0 0 24 24" className="size-3" fill={hex}>
        <path d={tool.icon.icon.path} />
      </svg>
    ) : (
      (() => {
        const Icon = tool.icon.icon;
        return <Icon className="size-3" style={{ color: hex }} />;
      })()
    );

  return (
    <span
      key={tool.name}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 text-xs font-medium text-secondary-foreground"
    >
      <span
        className="flex size-5 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${hex}1A` }}
      >
        {iconNode}
      </span>
      {tool.name}
    </span>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow index={2} />
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Skills
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            What I actually work with, grouped by what it's for rather than a
            flat list of tool names.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hardSkills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              title={skill.title}
              description={skill.description}
              color={skill.color}
              icon={<skill.icon />}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Soft skills
            </h3>
            <div className="mt-6 divide-y divide-border">
              {softSkills.map((skill) => (
                <div key={skill.title} className="py-4 first:pt-0">
                  <p className="font-medium text-foreground">{skill.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Software skills
            </h3>
            <div className="mt-6 divide-y divide-border">
              {softwareSkillGroups.map((group) => (
                <div key={group.category} className="py-4 first:pt-0">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wide text-primary">
                    {group.category}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.tools.map((tool) => toolBadge(tool))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
