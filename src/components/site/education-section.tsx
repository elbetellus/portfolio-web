"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { education } from "@/content/education";
import { DUR, EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion";
import { CornerMarks } from "./corner-marks";
import { CountUp } from "./count-up";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function EducationSection() {
  const e = education.primary;
  const rows = [
    ["Faculty", e.faculty],
    ["Concentration", e.concentration],
    ["Period", e.period],
    ["Campus", e.campus],
  ];

  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="Education"
          title={<span id="education-title">Business Intelligence, on paper and in practice.</span>}
          annotation="Sheet 04 / 07"
        />

        <Reveal className="panel relative grid overflow-hidden lg:grid-cols-12">
          <CornerMarks className="inset-2 z-10" />

          <div className="relative min-h-[260px] overflow-hidden border-b border-border lg:col-span-5 lg:border-r lg:border-b-0">
            <Image
              src={e.photo.src}
              alt={e.photo.alt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover grayscale contrast-[1.1]"
            />
            <div aria-hidden className="absolute inset-0 bg-[var(--data)] mix-blend-color opacity-60" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_oklab,var(--background)_92%,transparent)] via-[color-mix(in_oklab,var(--background)_30%,transparent)] to-transparent"
            />
            <div aria-hidden className="bp-grid absolute inset-0 opacity-60" />
            <div className="absolute inset-x-5 bottom-5">
              <p className="mono-label text-[0.6875rem] text-muted-foreground">Fig. 04 / {e.campus}</p>
              <p className="font-display mt-2 text-3xl leading-none font-bold sm:text-4xl">{e.school}</p>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:col-span-7 lg:p-10">
            <p className="mono-label text-signal-text">{e.degree}</p>

            <div className="mt-6 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-end">
              <div>
                <span className="mono-label text-[0.6875rem] text-muted-foreground">GPA</span>
                <p className="font-display mt-1 flex items-baseline gap-2 leading-none font-bold">
                  <CountUp value={e.gpa} className="text-6xl sm:text-7xl" />
                  <span className="text-xl text-muted-foreground">/ {e.gpaScale}</span>
                </p>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="mono-label text-[0.6875rem] text-muted-foreground">Degree progress</span>
                  <span className="mono-label text-[0.6875rem] text-foreground">
                    Semester {e.semester} of {e.totalSemesters}
                  </span>
                </div>
                <div
                  className="mt-3 grid grid-cols-8 gap-1"
                  role="img"
                  aria-label={`Semester ${e.semester} of ${e.totalSemesters}`}
                >
                  {Array.from({ length: e.totalSemesters }).map((_, i) => {
                    const done = i < e.semester - 1;
                    const current = i === e.semester - 1;
                    return (
                      <div key={i} className="relative h-2.5 overflow-hidden rounded-[2px] bg-[var(--tag-bg)] ring-1 ring-border ring-inset">
                        {done || current ? (
                          <motion.span
                            className={current ? "absolute inset-0 origin-left bg-signal" : "absolute inset-0 origin-left bg-data"}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: current ? 0.55 : 1 }}
                            viewport={VIEWPORT_ONCE}
                            transition={{ duration: DUR.medium, ease: EASE_OUT, delay: 0.3 + i * 0.12 }}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <dl className="mt-9 grid gap-x-8 gap-y-4 border-t border-border pt-7 sm:grid-cols-2">
              {rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono-label text-[0.6875rem] text-muted-foreground">{k}</dt>
                  <dd className="mt-1 text-[0.975rem] text-foreground">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <p className="mono-label text-[0.6875rem] text-muted-foreground">Relevant coursework</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {e.coursework.map((c) => (
                  <li
                    key={c}
                    className="rounded-[var(--tag-radius)] border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2.5 py-1 text-[0.8125rem] text-foreground/85"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-5 flex flex-col gap-2 rounded-[var(--radius-m)] border border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-lg font-semibold">{education.secondary.school}</span>
            <span className="text-sm text-muted-foreground">{education.secondary.program}</span>
          </div>
          <span className="mono-label text-[0.6875rem] text-muted-foreground">{education.secondary.period}</span>
        </Reveal>
      </div>
    </section>
  );
}
