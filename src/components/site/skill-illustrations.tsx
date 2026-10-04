/* Small decorative drawings for the two wide skill cards. Bars rise and layers separate on card hover. */

const monoStyle = { fontFamily: "var(--font-plex-mono), ui-monospace, monospace" };

export function MiniDashboard() {
  const bars = [38, 62, 48, 80, 56, 92, 70];
  return (
    <svg aria-hidden viewBox="0 0 260 150" className="h-auto w-[220px] xl:w-[270px]" style={monoStyle}>
      <rect x="0.5" y="0.5" width="259" height="149" rx="6" fill="var(--diagram-node-bg)" stroke="var(--diagram-stroke-faint)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={10 + i * 82} y="10" width="74" height="34" rx="3" fill="none" stroke="var(--diagram-stroke-faint)" />
          <rect x={16 + i * 82} y="17" width="26" height="4" rx="2" fill="var(--diagram-text)" opacity="0.5" />
          <rect x={16 + i * 82} y="27" width={i === 1 ? 40 : 32} height="9" rx="2" fill={i === 0 ? "var(--diagram-signal)" : "var(--diagram-flow)"} opacity="0.85" />
        </g>
      ))}
      <line x1="14" x2="246" y1="136" y2="136" stroke="var(--diagram-stroke-faint)" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={20 + i * 32}
          y={136 - h * 0.8}
          width="20"
          height={h * 0.8}
          rx="2"
          fill="var(--diagram-flow)"
          fillOpacity={i === 5 ? 0.85 : 0.35}
          className="origin-bottom scale-y-75 transition-transform duration-500 ease-out [transform-box:fill-box] group-hover:scale-y-100"
          style={{ transitionDelay: `${i * 40}ms` }}
        />
      ))}
      <path
        d="M30 96 L62 80 L94 88 L126 62 L158 74 L190 44 L222 58"
        fill="none"
        stroke="var(--diagram-signal)"
        strokeWidth="1.5"
        strokeDasharray="220"
        className="transition-[stroke-dashoffset] duration-700 ease-out [stroke-dashoffset:220] group-hover:[stroke-dashoffset:0]"
      />
    </svg>
  );
}

export function MiniStack() {
  const layers = [
    { label: "React screens", hover: "group-hover:-translate-y-1.5" },
    { label: "Supabase API", hover: "" },
    { label: "Postgres: RLS + triggers", hover: "group-hover:translate-y-1.5", strong: true },
  ];
  return (
    <svg aria-hidden viewBox="0 0 260 150" className="h-auto w-[220px] xl:w-[270px]" style={monoStyle}>
      <line x1="130" x2="130" y1="48" y2="98" stroke="var(--diagram-flow)" strokeDasharray="3 4" />
      {layers.map((l, i) => (
        <g key={l.label} className={`transition-transform duration-500 ease-out ${l.hover}`}>
          <rect
            x="20"
            y={18 + i * 42}
            width="220"
            height="30"
            rx="4"
            fill="var(--diagram-node-bg)"
            stroke={l.strong ? "var(--diagram-signal)" : "var(--diagram-stroke)"}
            strokeWidth={l.strong ? 1.5 : 1}
          />
          <text x="34" y={37 + i * 42} fontSize="11" fill={l.strong ? "var(--diagram-signal)" : "var(--foreground)"}>
            {l.label}
          </text>
          <circle cx="222" cy={33 + i * 42} r="3" fill={l.strong ? "var(--diagram-signal)" : "var(--diagram-flow)"} />
        </g>
      ))}
    </svg>
  );
}
