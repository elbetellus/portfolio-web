"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import type { Img } from "@/content/types";
import { CornerMarks } from "./corner-marks";
import { Lightbox } from "./lightbox";
import { RevealGroup, RevealItem } from "./reveal";
import { cn } from "@/lib/utils";

export function CaseGallery({ images, title }: { images: Img[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const single = images.length === 1;

  return (
    <>
      <RevealGroup as="ul" className={cn("grid gap-5", !single && "sm:grid-cols-2")}>
        {images.map((img, i) => {
          const tall = img.height > img.width * 1.2;
          return (
            <RevealItem as="li" key={img.src}>
              <figure>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group panel relative block w-full overflow-hidden text-left"
                  aria-label={`Open figure ${i + 1}: ${img.alt}`}
                >
                  <CornerMarks interactive className="inset-2 z-10" />
                  <div
                    className={cn(
                      "relative w-full overflow-hidden bg-muted",
                      single && tall ? "mx-auto aspect-[3/4] max-w-md" : tall ? "aspect-[4/3]" : "",
                    )}
                    style={!tall ? { aspectRatio: `${img.width} / ${img.height}` } : undefined}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={single ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"}
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full border border-border bg-[color-mix(in_oklab,var(--background)_80%,transparent)] backdrop-blur-sm transition-colors group-hover:border-signal">
                    <Expand aria-hidden className="size-4" />
                  </span>
                </button>
                <figcaption className="mt-3 flex gap-3 text-[0.9rem] leading-relaxed text-muted-foreground">
                  <span className="mono-label shrink-0 pt-0.5 text-[0.6875rem] text-signal-text">Fig. {i + 1}</span>
                  <span>{img.caption}</span>
                </figcaption>
              </figure>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <Lightbox
        items={images.map((img) => ({ ...img, title }))}
        index={index}
        onIndexChange={setIndex}
        label={`${title} figures`}
      />
    </>
  );
}
