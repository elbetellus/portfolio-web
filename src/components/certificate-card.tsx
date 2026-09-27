"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, FileText, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Certificate } from "@/lib/certificates";
import { cn } from "@/lib/utils";

export function CertificateCard({ cert }: { cert: Certificate }) {
  const [open, setOpen] = useState(false);
  const thumb = cert.image ?? (cert.fileType === "image" ? cert.file : undefined);
  const openable = Boolean(thumb);

  return (
    <>
      <button
        type="button"
        disabled={!openable}
        onClick={() => setOpen(true)}
        className={cn(
          "group flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-card text-left transition-all duration-200",
          openable
            ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40"
            : "cursor-default",
        )}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
          {thumb ? (
            <Image
              src={thumb}
              alt={cert.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : cert.fileType === "pdf" ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <FileText className="size-8" />
              <span className="font-mono text-xs">PDF</span>
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-muted-foreground/50">
              <Award className="size-8" />
              <span className="font-mono text-[10px] text-muted-foreground/60">
                No certificate on file
              </span>
            </div>
          )}

          {openable && (
            <div className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <Maximize2 className="size-3.5" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <h3 className="font-heading text-sm font-semibold leading-snug text-foreground">
            {cert.title}
          </h3>
          {cert.subtitle && (
            <p className="text-xs text-muted-foreground">{cert.subtitle}</p>
          )}
          <div className="mt-auto flex items-center justify-between pt-2 font-mono text-xs text-muted-foreground">
            <span className="truncate pr-2">{cert.issuer}</span>
            <span className="shrink-0">{cert.date}</span>
          </div>
          {cert.note && (
            <p className="pt-1 text-xs font-medium text-data">{cert.note}</p>
          )}
        </div>
      </button>

      {openable && thumb && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden p-0 sm:max-w-3xl">
            <DialogHeader className="gap-1 p-4">
              <DialogTitle>{cert.title}</DialogTitle>
              <p className="font-mono text-xs text-muted-foreground">
                {cert.issuer} · {cert.date}
              </p>
            </DialogHeader>
            <div className="relative aspect-[4/3] w-full bg-secondary">
              <Image
                src={thumb}
                alt={cert.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>
            {cert.fileType === "pdf" && cert.file && (
              <div className="border-t border-border p-3 text-center">
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Open original PDF
                </a>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
