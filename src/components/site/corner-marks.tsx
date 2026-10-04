import { cn } from "@/lib/utils";

/**
 * Drafting-style corner brackets around a framed element. Purely decorative.
 * With `interactive`, the brackets step outward and turn amber when a parent `.group` is hovered.
 */
export function CornerMarks({
  className,
  tone = "line",
  interactive = false,
}: {
  className?: string;
  tone?: "line" | "signal" | "data";
  interactive?: boolean;
}) {
  const color =
    tone === "signal" ? "border-signal" : tone === "data" ? "border-data" : "border-[var(--frame-mark)]";
  const base = cn(
    "pointer-events-none absolute size-3 transition-[translate,border-color] duration-300 ease-out",
    color,
    interactive && "group-hover:border-signal group-focus-visible:border-signal",
  );
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(base, "-top-px -left-px border-t border-l", interactive && "group-hover:-translate-x-1 group-hover:-translate-y-1")} />
      <span className={cn(base, "-top-px -right-px border-t border-r", interactive && "group-hover:translate-x-1 group-hover:-translate-y-1")} />
      <span className={cn(base, "-bottom-px -left-px border-b border-l", interactive && "group-hover:-translate-x-1 group-hover:translate-y-1")} />
      <span className={cn(base, "-right-px -bottom-px border-r border-b", interactive && "group-hover:translate-x-1 group-hover:translate-y-1")} />
    </span>
  );
}
