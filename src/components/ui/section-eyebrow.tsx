interface SectionEyebrowProps {
  index: number;
  className?: string;
}

export function SectionEyebrow({ index, className }: SectionEyebrowProps) {
  return (
    <div className={`mb-3 flex items-center gap-3 ${className ?? ""}`}>
      <span className="font-mono text-xs font-semibold tracking-widest text-primary">
        {String(index).padStart(2, "0")}
      </span>
      <span className="h-px w-8 bg-border" aria-hidden="true" />
    </div>
  );
}
