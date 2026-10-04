import Image from "next/image";
import { Ruler, Scissors, ShieldCheck, Target } from "lucide-react";
import { about, keyStats, principles, profile } from "@/content/site";
import { CornerMarks } from "./corner-marks";
import { CountUp } from "./count-up";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeading } from "./section-heading";

const principleIcons = [Target, ShieldCheck, Ruler, Scissors];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={<span id="about-title">The person behind the data.</span>}
          annotation="Sheet 01 / 07"
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <figure className="relative mx-auto max-w-sm lg:mx-0">
              <div className="relative overflow-hidden rounded-[var(--radius-m)] border border-border bg-card-solid p-2">
                <CornerMarks tone="signal" />
                <Image
                  src={profile.photo.src}
                  width={profile.photo.width}
                  height={profile.photo.height}
                  alt={profile.photo.alt}
                  sizes="(min-width: 1024px) 380px, 90vw"
                  className="aspect-square w-full rounded-[calc(var(--radius-m)-4px)] object-cover"
                  priority={false}
                />
              </div>
              <figcaption className="mono-label mt-3 flex items-center justify-between text-[0.6875rem] text-muted-foreground">
                <span>Fig. 01 / {profile.name}</span>
                <span>{profile.locationShort}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <div className="space-y-5 text-lg leading-relaxed text-foreground/90 md:text-[1.1875rem]">
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 flex gap-3 rounded-[var(--radius-s)] border border-dashed border-border-strong bg-[color-mix(in_oklab,var(--data)_6%,transparent)] px-4 py-3 text-[0.95rem] text-muted-foreground">
                <span className="mono-label mt-0.5 shrink-0 text-data">Now</span>
                <span>{about.now}</span>
              </p>
            </Reveal>

            <RevealGroup as="ul" className="mt-12 grid grid-cols-2 border-t border-l border-border md:grid-cols-4">
              {keyStats.map((s) => (
                <RevealItem
                  as="li"
                  key={s.label}
                  className="relative border-r border-b border-border bg-[color-mix(in_oklab,var(--card-solid)_40%,transparent)] p-4 sm:p-5"
                >
                  <CountUp
                    value={s.value}
                    className="font-display block text-[clamp(1.75rem,1.35rem+1vw,2.25rem)] leading-none font-bold whitespace-nowrap text-foreground"
                  />
                  <span className="mt-3 block text-sm font-medium text-foreground">{s.label}</span>
                  {s.note ? <span className="mt-1 block text-[0.8125rem] text-muted-foreground">{s.note}</span> : null}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <div className="mt-24">
          <Reveal>
            <h3 className="mono-label flex items-center gap-3 text-muted-foreground">
              <span aria-hidden className="h-px w-8 bg-line" />
              How I work
            </h3>
          </Reveal>
          <RevealGroup as="ol" className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => {
              const Icon = principleIcons[i];
              return (
                <RevealItem
                  as="li"
                  key={p.title}
                  className="group relative bg-[color-mix(in_oklab,var(--background)_88%,var(--card-solid))] p-6 transition-colors duration-300 hover:bg-card-solid"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-signal-text">0{i + 1}</span>
                    <Icon aria-hidden className="size-5 text-data transition-transform duration-300 group-hover:-translate-y-0.5" />
                  </div>
                  <h4 className="font-display mt-8 text-lg leading-snug font-semibold">{p.title}</h4>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{p.body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
