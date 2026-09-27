import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { CountUp } from "@/components/ui/count-up";

interface Stat {
  value: string;
  label: string;
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4";
}

const stats: Stat[] = [
  { value: "3.92", label: "GPA", color: "chart-1" },
  { value: "Top 5%", label: "SIS Excellence Awards", color: "chart-2" },
  { value: "2×", label: "Best Assistant Awards", color: "chart-3" },
  { value: "3rd", label: "National Science Olympiad", color: "chart-4" },
];

const colorClasses: Record<Stat["color"], string> = {
  "chart-1": "border-chart-1/30 bg-chart-1/10",
  "chart-2": "border-chart-2/30 bg-chart-2/10",
  "chart-3": "border-chart-3/30 bg-chart-3/10",
  "chart-4": "border-chart-4/30 bg-chart-4/10",
};

const pinClasses: Record<Stat["color"], string> = {
  "chart-1": "bg-chart-1",
  "chart-2": "bg-chart-2",
  "chart-3": "bg-chart-3",
  "chart-4": "bg-chart-4",
};

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1fr_minmax(0,300px)] md:gap-16">
          <Reveal>
            <SectionEyebrow index={1} />
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The person behind{" "}
              <span className="relative inline-block -rotate-1 rounded bg-chart-3/25 px-2 text-foreground">
                the data
              </span>
              .
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                I&apos;m an Information Systems student at BINUS University,
                currently in my fifth semester with a Business Intelligence
                concentration. For about a year and a half, I worked as a
                part-time Laboratory Assistant, teaching Data Structures, NLP,
                Database Technology, and other computer science courses to
                underclassmen.
              </p>
              <p>
                What sets my work apart is that most of it comes from a real
                business, not a class assignment. My family runs{" "}
                <span className="font-medium text-foreground">
                  Olahan Mama Cerdas
                </span>
                , a frozen food business, and I built its inventory and sales
                system myself, from the database rules to the dashboard
                owners actually use to make decisions. Every analysis I do
                starts from data that moves a real supply chain, not a public
                dataset.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative mx-auto w-full max-w-64 md:mx-0">
            <div className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 rounded-sm bg-chart-3/70 shadow-sm" />
            <div className="relative rotate-2 rounded-lg border border-border bg-card p-3 shadow-lg">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-secondary">
                <Image
                  src="/images/profile.webp"
                  alt="Yosua Elbetellus"
                  fill
                  sizes="(min-width: 768px) 300px, 256px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.08}
              className={`relative rounded-2xl border p-5 ${colorClasses[stat.color]}`}
            >
              <span
                className={`absolute -top-1.5 left-5 size-3 rounded-full ring-4 ring-background ${pinClasses[stat.color]}`}
              />
              <div className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                <CountUp value={stat.value} />
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
