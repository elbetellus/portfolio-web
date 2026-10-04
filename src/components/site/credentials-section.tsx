"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand, Trophy } from "lucide-react";
import { certificates, honors } from "@/content/credentials";
import { CornerMarks } from "./corner-marks";
import { Lightbox } from "./lightbox";
import { RevealGroup, RevealItem } from "./reveal";
import { SectionHeading } from "./section-heading";

export function CredentialsSection() {
  const [index, setIndex] = useState<number | null>(null);
  const items = certificates.map((c) => ({
    ...c.image,
    title: c.title,
    caption: c.subtitle,
    meta: `${c.issuer} · ${c.date}`,
    pdf: c.pdf,
  }));

  return (
    <section id="credentials" aria-labelledby="credentials-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          eyebrow="Credentials"
          title={<span id="credentials-title">Certificates and awards.</span>}
          intro="Licenses, honors, and competition results from BINUS and before. Select a certificate to view it."
          annotation="Sheet 06 / 07"
        />

        <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {certificates.map((c, i) => (
            <RevealItem as="li" key={c.title + c.date}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group panel relative flex h-full w-full flex-col overflow-hidden text-left transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong"
              >
                <CornerMarks interactive className="inset-2 z-10" />
                <div className="relative aspect-[1.45] overflow-hidden border-b border-border bg-muted">
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full border border-border bg-[color-mix(in_oklab,var(--background)_80%,transparent)] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <Expand aria-hidden className="size-4" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.05rem] leading-snug font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.subtitle}</p>
                  <p className="mono-label mt-auto pt-5 text-[0.6875rem] text-muted-foreground">
                    <span className="text-foreground/80">{c.issuer}</span>
                    <span className="text-line"> · </span>
                    {c.date}
                  </p>
                </div>
              </button>
            </RevealItem>
          ))}

          <RevealItem as="li" className="sm:col-span-2">
            <div className="panel relative h-full p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <Trophy aria-hidden className="size-5 text-signal-text" />
                <h3 className="font-display text-lg font-semibold">Honors and competitions</h3>
              </div>
              <ul className="mt-5 divide-y divide-border border-y border-border">
                {honors.map((h) => (
                  <li key={h.title} className="grid grid-cols-[56px_1fr] gap-3 py-3.5 sm:grid-cols-[64px_1fr_auto] sm:items-baseline">
                    <span className="font-mono text-sm text-signal-text tabular">{h.year}</span>
                    <span className="text-[0.95rem] leading-snug text-foreground">{h.title}</span>
                    <span className="col-start-2 text-sm text-muted-foreground sm:col-start-3">{h.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>

      <Lightbox items={items} index={index} onIndexChange={setIndex} label="Certificates" />
    </section>
  );
}
