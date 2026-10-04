import { ArrowDownRight, ArrowDownToLine, MapPin } from "lucide-react";
import { hero, profile } from "@/content/site";
import { actionClass } from "./action";
import { CornerMarks } from "./corner-marks";
import { HeroDiagram } from "./hero-diagram";

/** Staggered CSS entrance: runs on first paint, no hydration wait. */
const rise = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center pt-[calc(var(--nav-height)+2.5rem)] pb-20 lg:pb-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:px-8">
        <div className="relative">
          <p className="mono-label animate-rise text-muted-foreground" style={rise(0)}>
            <span className="text-signal-text">00</span>
            <span aria-hidden className="mx-3 inline-block h-px w-8 bg-line align-middle" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="font-display mt-7 text-[clamp(3.1rem,1.9rem+5.2vw,5.6rem)] leading-[0.95] font-bold"
          >
            <span className="block animate-rise" style={rise(80)}>
              Yosua
            </span>
            <span className="block animate-rise" style={rise(160)}>
              Elbetellus
              <span aria-hidden className="ml-2 inline-block size-[0.16em] translate-y-[-0.08em] bg-signal" />
            </span>
          </h1>

          <p
            className="mt-7 max-w-xl animate-rise text-[clamp(1.25rem,1.05rem+0.9vw,1.6rem)] leading-snug font-medium text-foreground"
            style={rise(260)}
          >
            {hero.lead}
          </p>
          <p className="mt-4 max-w-lg animate-rise text-base text-muted-foreground md:text-lg" style={rise(320)}>
            {hero.sub}
          </p>

          <div className="mt-9 flex flex-wrap gap-3 animate-rise" style={rise(400)}>
            <a href="#work" className={actionClass({ variant: "primary" })}>
              View projects
              <ArrowDownRight className="transition-transform duration-200 group-hover/action:translate-x-0.5 group-hover/action:translate-y-0.5" />
            </a>
            <a href={profile.cv} download className={actionClass({ variant: "outline" })}>
              <ArrowDownToLine />
              Download CV
            </a>
          </div>

          <ul className="mono-label mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-muted-foreground animate-rise" style={rise(480)}>
            <li className="flex items-center gap-2.5">
              <span aria-hidden className="size-2 rounded-full bg-pass animate-pulse-dot" />
              {hero.availability}
            </li>
            <li className="flex items-center gap-2">
              <MapPin aria-hidden className="size-3.5" />
              {profile.locationShort}
            </li>
          </ul>
        </div>

        <figure className="relative animate-fade" style={rise(150)}>
          <div className="relative rounded-[var(--radius-m)] border border-border bg-[color-mix(in_oklab,var(--card-solid)_35%,transparent)] p-3 backdrop-blur-[2px] sm:p-5">
            <CornerMarks tone="data" />
            <HeroDiagram />
          </div>
          <figcaption className="mono-label mt-3 flex justify-between text-[0.6875rem] text-muted-foreground">
            <span>Fig. 00 / Data model of the OMC app</span>
            <span className="hidden sm:inline">Scale 1:1</span>
          </figcaption>
        </figure>
      </div>

      <a
        href="#about"
        className="mono-label absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.6875rem] text-muted-foreground transition-colors hover:text-foreground md:flex"
      >
        Scroll
        <span aria-hidden className="relative h-10 w-px overflow-hidden bg-line-faint">
          <span className="absolute inset-x-0 top-0 h-4 animate-[scroll-cue_2s_var(--ease-in-out)_infinite] bg-data" />
        </span>
      </a>
    </section>
  );
}
