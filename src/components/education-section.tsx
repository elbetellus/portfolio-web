import Image from "next/image";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { CountUp } from "@/components/ui/count-up";

const coursework = [
  "Database Programming with PL/SQL",
  "Data Modelling & Visualization",
  "Cloud Database",
  "Enterprise Data Warehouse & Big Data Architecture",
  "Information Systems Analysis & Design",
  "Enterprise Business Process",
  "IS Project Management",
];

const TOTAL_SEMESTERS = 8;
const CURRENT_SEMESTER = 5;

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow index={3} />
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Education
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/binus-campus.webp"
                alt="BINUS University campus"
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-background/90 px-4 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                2024 to 2028 (expected)
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              BINUS University
            </h3>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <MapPin className="size-3.5" aria-hidden="true" />
              BINUS @Alam Sutera · Tangerang, Indonesia
            </span>

            <p className="mt-4 text-muted-foreground">
              Bachelor of Computer Science (S.Kom), Information Systems,
              School of Information Systems
            </p>
            <p className="mt-1 font-medium text-foreground">
              Business Intelligence concentration
            </p>

            <div className="mt-8 grid grid-cols-3 divide-x divide-border border-y border-border py-6">
              <div>
                <div className="flex items-baseline gap-1 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  <CountUp value="3.92" />
                  <span className="text-sm font-normal text-muted-foreground">
                    / 4.00
                  </span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  GPA
                </p>
              </div>
              <div className="pl-6">
                <div className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  5th
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Semester
                </p>
              </div>
              <div className="pl-6">
                <div className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  2028
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Expected graduation
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Degree progress
              </p>
              <p className="text-xs font-semibold text-muted-foreground">
                Semester {CURRENT_SEMESTER} of {TOTAL_SEMESTERS}
              </p>
            </div>
            <div className="mt-3 flex gap-1.5">
              {Array.from({ length: TOTAL_SEMESTERS }).map((_, i) => {
                const isDone = i < CURRENT_SEMESTER - 1;
                const isCurrent = i === CURRENT_SEMESTER - 1;
                return (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      isDone
                        ? "bg-foreground"
                        : isCurrent
                          ? "bg-foreground/25"
                          : "bg-muted"
                    }`}
                    style={
                      isCurrent
                        ? {
                            backgroundImage:
                              "repeating-linear-gradient(45deg, var(--foreground) 0, var(--foreground) 3px, transparent 3px, transparent 6px)",
                          }
                        : undefined
                    }
                  />
                );
              })}
            </div>

            <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Relevant coursework
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {course}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
