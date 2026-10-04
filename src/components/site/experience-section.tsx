"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, Images } from "lucide-react";
import { communityService, experience, type ExperienceEntry } from "@/content/experience";
import { DUR, EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion";
import { Lightbox } from "./lightbox";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function PhotoStrip({ entry }: { entry: ExperienceEntry }) {
  const [index, setIndex] = useState<number | null>(null);
  const visible = entry.photos.slice(0, 4);
  const extra = entry.photos.length - visible.length;
  const items = entry.photos.map((p) => ({ ...p, title: entry.role, caption: `${entry.role}, ${entry.organization}` }));
  return (
    <>
      <ul className="mt-6 grid grid-cols-4 gap-2" aria-label={`${entry.role} photos`}>
        {visible.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-[var(--radius-s)] border border-border bg-muted"
              aria-label={`Open photo ${i + 1} of ${entry.photos.length}: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 140px, 22vw"
                className="object-cover grayscale-[35%] transition-[transform,filter] duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              {i === visible.length - 1 && extra > 0 ? (
                <span className="absolute inset-0 grid place-items-center bg-[color-mix(in_oklab,var(--background)_62%,transparent)] font-mono text-sm text-foreground backdrop-blur-[1px]">
                  +{extra}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={index} onIndexChange={setIndex} label={`${entry.role} photos`} />
    </>
  );
}

export function ExperienceSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title={<span id="experience-title">Teaching, leading, and showing up.</span>}
          intro="A year and a half teaching eight courses, plus two campus roles where the job was looking after people."
          annotation="Sheet 03 / 07"
        />

        <ol ref={listRef} className="relative">
          {/* Timeline rail: faint track plus a progress line drawn by scroll */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line-faint lg:left-[227px]" />
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-data lg:left-[227px]"
            style={{ scaleY: progress }}
          />

          {experience.map((entry) => (
            <li key={entry.id} className="relative grid gap-4 pb-16 pl-9 last:pb-0 lg:grid-cols-[200px_1fr] lg:gap-14 lg:pl-0">
              <motion.span
                aria-hidden
                className="absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border border-data bg-background lg:left-[220px]"
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: DUR.medium, ease: EASE_OUT }}
              >
                <span className="size-[5px] rounded-full bg-data" />
              </motion.span>

              <Reveal className="lg:pt-0.5 lg:text-right">
                <p className="mono-label text-signal-text">{entry.period}</p>
                <p className="mt-2 text-sm text-muted-foreground lg:ml-auto lg:max-w-[190px]">{entry.organization}</p>
              </Reveal>

              <Reveal delay={0.05} className="panel relative p-5 sm:p-7">
                <h3 className="font-display text-2xl leading-tight font-semibold">{entry.role}</h3>
                <p className="mt-2 text-[1.0625rem] text-foreground/90">{entry.summary}</p>

                {entry.chips ? (
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Courses taught">
                    {entry.chips.map((c) => (
                      <li
                        key={c}
                        className="rounded-[var(--tag-radius)] border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2 py-1 text-[0.8125rem] text-muted-foreground"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <ul className="mt-5 space-y-3">
                  {entry.bullets.map((b) => (
                    <li key={b.slice(0, 32)} className="relative pl-5 text-[0.975rem] leading-relaxed text-muted-foreground">
                      <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2.5 bg-data" />
                      {b}
                    </li>
                  ))}
                </ul>

                {entry.awards ? (
                  <ul className="mt-6 grid gap-2 border-t border-dashed border-border-strong pt-5 sm:grid-cols-2">
                    {entry.awards.map((a) => (
                      <li key={a} className="flex items-start gap-2.5 text-sm text-foreground">
                        <Award aria-hidden className="mt-0.5 size-4 shrink-0 text-signal-text" />
                        {a}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {entry.photos.length ? (
                  <div className="mt-2">
                    <PhotoStrip entry={entry} />
                    <p className="mono-label mt-2 flex items-center gap-2 text-[0.6875rem] text-muted-foreground">
                      <Images aria-hidden className="size-3.5" />
                      {entry.photos.length} photos
                    </p>
                  </div>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-20 lg:ml-[264px]">
          <h3 className="mono-label flex items-center gap-3 text-muted-foreground">
            <span aria-hidden className="h-px w-8 bg-line" />
            {communityService.title}
          </h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-m)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {communityService.items.map((item) => (
              <li key={item.term} className="bg-[color-mix(in_oklab,var(--background)_90%,var(--card-solid))] p-5">
                <p className="mono-label text-[0.6875rem] text-signal-text">{item.term}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
