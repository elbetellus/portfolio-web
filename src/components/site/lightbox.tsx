"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Img } from "@/content/types";
import { DUR, EASE_OUT } from "@/lib/motion";
import { actionClass } from "./action";

export interface LightboxItem extends Img {
  title?: string;
  meta?: string;
  pdf?: string;
}

/** Full-size image viewer with arrow-key navigation, used by galleries, photos, and certificates. */
export function Lightbox({
  items,
  index,
  onIndexChange,
  label,
}: {
  items: LightboxItem[];
  index: number | null;
  onIndexChange: (i: number | null) => void;
  label: string;
}) {
  const open = index !== null;
  const item = open ? items[index] : null;
  const many = items.length > 1;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open || !many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, many, go]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogContent className="max-h-[94dvh] w-[min(1120px,calc(100%-1.5rem))] max-w-none gap-0 overflow-hidden border border-border bg-card-solid p-0 sm:max-w-none">
        <DialogTitle className="sr-only">{item?.title ?? item?.alt ?? label}</DialogTitle>
        <DialogDescription className="sr-only">{item?.caption ?? label}</DialogDescription>
        {item ? (
          <>
            <div className="bp-grid relative flex min-h-[40vh] items-center justify-center bg-background p-3 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: DUR.short, ease: EASE_OUT }}
                  className="relative flex max-h-[72dvh] w-full justify-center"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 1120px) 1080px, 96vw"
                    className="h-auto max-h-[72dvh] w-auto max-w-full rounded-[var(--radius-s)] border border-border object-contain"
                  />
                </motion.div>
              </AnimatePresence>
              {many ? (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous image"
                    className={actionClass({
                      variant: "outline",
                      size: "icon",
                      className: "absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-card-solid",
                    })}
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next image"
                    className={actionClass({
                      variant: "outline",
                      size: "icon",
                      className: "absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-card-solid",
                    })}
                  >
                    <ChevronRight />
                  </button>
                </>
              ) : null}
            </div>
            <div className="flex flex-col gap-3 border-t border-border p-4 pr-14 sm:flex-row sm:items-center sm:justify-between sm:p-5 sm:pr-16">
              <div className="min-w-0">
                {item.title ? <p className="font-display text-base font-semibold">{item.title}</p> : null}
                <p className="text-sm leading-relaxed text-muted-foreground">{item.caption ?? item.meta ?? item.alt}</p>
                {item.title && item.meta ? <p className="mono-label mt-1 text-[0.6875rem] text-muted-foreground">{item.meta}</p> : null}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {item.pdf ? (
                  <a href={item.pdf} target="_blank" rel="noreferrer" className={actionClass({ variant: "outline", size: "sm" })}>
                    <FileText />
                    Open PDF
                  </a>
                ) : null}
                {many && index !== null ? (
                  <span className="mono-label tabular text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
