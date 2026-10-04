import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export function StatusChip({ status, className }: { status: Project["status"]; className?: string }) {
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center gap-2 rounded-[var(--tag-radius)] border bg-[color-mix(in_oklab,var(--background)_82%,transparent)] px-2 py-1 text-[0.6875rem] backdrop-blur-sm",
        status.tone === "live" && "border-[color-mix(in_oklab,var(--pass)_45%,transparent)] text-pass",
        status.tone === "award" && "border-[color-mix(in_oklab,var(--signal)_55%,transparent)] text-signal-text",
        status.tone === "neutral" && "border-border text-muted-foreground",
        className,
      )}
    >
      {status.tone === "live" ? <span aria-hidden className="size-1.5 rounded-full bg-pass animate-pulse-dot" /> : null}
      {status.label}
    </span>
  );
}
