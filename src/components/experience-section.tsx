import Image from "next/image";
import { experience, type AccentColor } from "@/lib/experience";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

const badgeClasses: Record<AccentColor, string> = {
  "chart-1": "border-chart-1/30 bg-chart-1/10",
  "chart-2": "border-chart-2/30 bg-chart-2/10",
  "chart-3": "border-chart-3/30 bg-chart-3/10",
  "chart-4": "border-chart-4/30 bg-chart-4/10",
  "chart-5": "border-chart-5/30 bg-chart-5/10",
  "chart-6": "border-chart-6/30 bg-chart-6/10",
};

const dotClasses: Record<AccentColor, string> = {
  "chart-1": "bg-chart-1",
  "chart-2": "bg-chart-2",
  "chart-3": "bg-chart-3",
  "chart-4": "bg-chart-4",
  "chart-5": "bg-chart-5",
  "chart-6": "bg-chart-6",
};

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow index={4} />
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Experience
          </h2>
        </Reveal>

        <div className="mt-10 space-y-10 sm:space-y-12">
          {experience.map((entry, index) => (
            <Reveal
              key={entry.role}
              delay={index * 0.08}
              className="relative pl-8 sm:pl-10"
            >
              {index < experience.length - 1 && (
                <span
                  className="absolute left-[5px] top-4 -bottom-10 w-px bg-border sm:left-[7px] sm:-bottom-12"
                  aria-hidden="true"
                />
              )}
              <span
                className={`absolute left-0 top-1.5 size-[11px] rounded-full ring-4 ring-background sm:size-[15px] ${dotClasses[entry.color]}`}
                aria-hidden="true"
              />

                <div className="md:max-w-2xl">
                  <span
                    className={`inline-block rounded-full border px-4 py-1.5 text-sm font-medium text-foreground ${badgeClasses[entry.color]}`}
                  >
                    {entry.period}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-foreground sm:text-2xl">
                    {entry.organization}
                  </h3>
                  <p className="mt-1 font-medium text-primary">{entry.role}</p>
                  <ul className="mt-4 space-y-3">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {entry.photos && (
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {entry.photos.map((src) => (
                      <div
                        key={src}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-secondary"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 33vw, 45vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
