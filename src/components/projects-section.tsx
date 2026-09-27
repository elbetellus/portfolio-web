"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Images } from "lucide-react";
import { WorksWheel } from "@/components/ui/works-wheel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { projects } from "@/lib/projects";

function ProjectLinks({ index }: { index: number }) {
  const project = projects[index];
  const [galleryOpen, setGalleryOpen] = useState(false);
  const hasGallery = Boolean(project.gallery?.length);

  return (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View project
            <ArrowUpRight className="size-3.5" />
          </a>
        )}
        {hasGallery && (
          <button
            type="button"
            onClick={() => setGalleryOpen(true)}
            className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-foreground hover:underline"
          >
            See screenshots
            <Images className="size-3.5" />
          </button>
        )}
      </div>

      {hasGallery && (
        <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
          <DialogContent className="max-h-[85vh] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
            <DialogHeader className="p-4 pb-0">
              <DialogTitle>{project.title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-6 p-4">
              {project.gallery!.map((shot) => (
                <figure key={shot.src}>
                  <div className="w-full overflow-hidden rounded-lg border border-border bg-secondary">
                    <Image
                      src={shot.src}
                      alt={shot.caption}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 640px) 672px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const project = projects[active];

  return (
    <section id="projects" className="scroll-mt-24 border-t border-border py-16">
      <h2 className="sr-only">Projects</h2>
      <div className="relative mx-auto h-[560px] w-full max-w-6xl px-4 sm:h-[880px] sm:px-6">
        <WorksWheel
          items={projects}
          label="Projects"
          onActiveChange={setActive}
          onEngagedChange={setEngaged}
        />

        <div
          className={`pointer-events-none absolute top-1/2 right-[6%] hidden max-w-56 -translate-y-1/2 transition-opacity duration-300 md:block ${
            engaged ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <ProjectLinks index={active} />
        </div>
      </div>

      <div
        className={`mx-auto max-w-6xl px-4 pb-8 text-center transition-opacity duration-300 sm:px-6 md:hidden ${
          engaged ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-3 flex justify-center">
          <ProjectLinks index={active} />
        </div>
      </div>

      <p className="pb-8 text-center font-mono text-xs text-muted-foreground">
        {engaged
          ? "Scroll, drag, or use the arrow keys to browse."
          : "Scroll, drag, or click to turn the wheel."}
      </p>
    </section>
  );
}
