const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/**
 * Fixed backdrop for every page: drafting grid, two soft light sources, a faint
 * protractor drawing, edge rulers, and paper grain. Purely decorative.
 */
export function BlueprintBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bp-grid absolute inset-0 [mask-image:radial-gradient(130%_100%_at_50%_0%,#000_40%,transparent_92%)]" />

      <div
        className="absolute -top-[30vmax] -left-[20vmax] h-[80vmax] w-[80vmax] rounded-full"
        style={{ background: "radial-gradient(closest-side, var(--glow-data), transparent)" }}
      />
      <div
        className="absolute -right-[25vmax] -bottom-[35vmax] h-[80vmax] w-[80vmax] rounded-full"
        style={{ background: "radial-gradient(closest-side, var(--glow-signal), transparent)" }}
      />

      {/* Protractor arcs, top right */}
      <svg
        className="absolute -top-40 -right-40 h-[620px] w-[620px] text-line opacity-35 md:opacity-50"
        viewBox="0 0 620 620"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="1">
          <circle cx="310" cy="310" r="300" strokeOpacity="0.35" />
          <circle cx="310" cy="310" r="230" strokeOpacity="0.25" strokeDasharray="2 6" />
          <circle cx="310" cy="310" r="160" strokeOpacity="0.3" />
          <path d="M10 310H610M310 10V610" strokeOpacity="0.2" />
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i * 10 * Math.PI) / 180;
            const inner = i % 3 === 0 ? 280 : 290;
            return (
              <line
                key={i}
                x1={310 + Math.cos(a) * inner}
                y1={310 + Math.sin(a) * inner}
                x2={310 + Math.cos(a) * 300}
                y2={310 + Math.sin(a) * 300}
                strokeOpacity="0.45"
              />
            );
          })}
        </g>
      </svg>

      {/* Edge rulers, large screens only */}
      <div
        className="absolute inset-y-0 left-0 hidden w-3 border-r border-line-faint lg:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--line-faint) 0 1px, transparent 1px 24px), repeating-linear-gradient(to bottom, var(--line) 0 1px, transparent 1px 120px)",
          backgroundSize: "6px 100%, 12px 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top, right top",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 hidden w-3 border-l border-line-faint lg:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--line-faint) 0 1px, transparent 1px 24px), repeating-linear-gradient(to bottom, var(--line) 0 1px, transparent 1px 120px)",
          backgroundSize: "6px 100%, 12px 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left top, left top",
        }}
      />

      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: NOISE, opacity: "var(--noise-opacity)" }}
      />
    </div>
  );
}
