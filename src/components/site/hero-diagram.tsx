"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Transition,
} from "framer-motion";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";

/*
  Hero illustration: the star schema behind the OMC app, fed by the Nota pipeline,
  with the real Nota evaluation numbers as a small bar chart.
  Sequence: tables draw, connectors draw, labels and bars appear, then data packets
  flow into the fact table on a slow loop. Static under reduced motion.
*/

const ROW = 16;
const HEAD = 24;

interface Table {
  id: string;
  x: number;
  y: number;
  w: number;
  rows: { label: string; key?: "PK" | "FK"; signal?: boolean }[];
}

const dims: Table[] = [
  { id: "dim_product", x: 20, y: 52, w: 132, rows: [{ label: "product_id", key: "PK" }, { label: "name" }, { label: "price_list" }] },
  { id: "dim_date", x: 448, y: 52, w: 132, rows: [{ label: "date_id", key: "PK" }, { label: "day" }, { label: "week" }] },
  { id: "dim_reseller", x: 20, y: 330, w: 132, rows: [{ label: "reseller_id", key: "PK" }, { label: "name" }, { label: "area" }] },
  { id: "cash_period", x: 448, y: 330, w: 132, rows: [{ label: "period_id", key: "PK" }, { label: "opened_at" }, { label: "is_locked", signal: true }] },
];

const fact: Table = {
  id: "fct_transactions",
  x: 215,
  y: 170,
  w: 170,
  rows: [
    { label: "txn_id", key: "PK" },
    { label: "product_id", key: "FK" },
    { label: "reseller_id", key: "FK" },
    { label: "date_id", key: "FK" },
    { label: "period_id", key: "FK" },
    { label: "qty" },
    { label: "price_locked", signal: true },
  ],
};

const connectors = [
  { id: "c-product", d: "M152 84 H184 V218 H215", side: "left" as const, y: 218, oneX: 158 },
  { id: "c-reseller", d: "M152 362 H184 V234 H215", side: "left" as const, y: 234, oneX: 158 },
  { id: "c-date", d: "M448 84 H416 V250 H385", side: "right" as const, y: 250, oneX: 442 },
  { id: "c-period", d: "M448 362 H416 V266 H385", side: "right" as const, y: 266, oneX: 442 },
];

const pipeline = [
  { x: 60, label: "PHOTO" },
  { x: 180, label: "READ" },
  { x: 300, label: "MATCH" },
  { x: 420, label: "VALIDATE" },
  { x: 540, label: "SAVE" },
];
const FEED = "M60 468 H540 V440 H300 V306";

const bars = [
  { x: 206, value: 86.4, label: "PRODUCT" },
  { x: 282, value: 100, label: "QTY" },
  { x: 358, value: 95.5, label: "PRICE" },
];
const BAR_BASE = 122;
const BAR_MAX = 54;

const tablePath = (t: Table) => {
  const h = HEAD + t.rows.length * ROW;
  return `M${t.x} ${t.y} h${t.w} v${h} h${-t.w} Z`;
};

const mono = { fontFamily: "var(--font-plex-mono), ui-monospace, monospace" };

export function HeroDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion() ?? false;
  const [flowing, setFlowing] = useState(false);

  // Start the packet loop once the drawing has finished.
  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setFlowing(true), 2600);
    return () => window.clearTimeout(t);
  }, [reduce]);

  // Pause SMIL packets while the hero is off screen.
  useEffect(() => {
    const svg = ref.current;
    if (!svg || !flowing) return;
    if (inView) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [inView, flowing]);

  // Gentle pointer parallax, fine pointers only.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const backX = useTransform(sx, (v) => v * -6);
  const backY = useTransform(sy, (v) => v * -6);
  const frontX = useTransform(sx, (v) => v * 8);
  const frontY = useTransform(sy, (v) => v * 8);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  const draw = (delay: number, duration = 1): Transition => ({
    pathLength: { delay, duration, ease: EASE_IN_OUT },
    opacity: { delay, duration: 0.01 },
  });
  const appear = (delay: number): Transition => ({ delay, duration: 0.5, ease: EASE_OUT });

  const hidden = reduce ? false : "hidden";

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 520"
      role="img"
      aria-label="Illustration: a star schema with a fact table of transactions linked to product, date, reseller, and cash period tables, fed by a five-step note-reading pipeline."
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <marker id="hd-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--diagram-flow)" />
        </marker>
        <filter id="hd-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Back layer: frame annotations */}
      <motion.g style={{ x: backX, y: backY }} initial={hidden} animate="visible">
        <motion.g
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={appear(0.1)}
          stroke="var(--diagram-stroke-faint)"
          strokeWidth="1"
        >
          {[
            [8, 8],
            [592, 8],
            [8, 512],
            [592, 512],
          ].map(([x, y]) => (
            <path key={`${x}-${y}`} d={`M${x - 6} ${y} H${x + 6} M${x} ${y - 6} V${y + 6}`} />
          ))}
          <path d="M20 22 V34 M580 22 V34 M20 28 H580" />
        </motion.g>
        <motion.text
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={appear(0.3)}
          x="300"
          y="31"
          textAnchor="middle"
          fontSize="9"
          letterSpacing="2"
          fill="var(--diagram-text)"
          style={mono}
        >
          <tspan style={{ paintOrder: "stroke" }} stroke="var(--background)" strokeWidth="6">
            STAR SCHEMA · OMC STOCK AND CASH FLOW
          </tspan>
        </motion.text>
      </motion.g>

      {/* Front layer: the model itself */}
      <motion.g style={{ x: frontX, y: frontY }} initial={hidden} animate="visible">
        {/* Connectors */}
        {connectors.map((c, i) => (
          <g key={c.id}>
            <motion.path
              d={c.d}
              fill="none"
              stroke="var(--diagram-stroke)"
              strokeWidth="1.25"
              variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
              transition={draw(1.0 + i * 0.12, 0.9)}
            />
            <motion.g
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={appear(1.8 + i * 0.05)}
              stroke="var(--diagram-stroke)"
              strokeWidth="1.25"
              fill="none"
            >
              {/* "one" bars at the dimension end */}
              <path
                d={
                  c.side === "left"
                    ? `M${c.oneX} ${c.id === "c-product" ? 79 : 357} V${c.id === "c-product" ? 89 : 367} M${c.oneX + 4} ${c.id === "c-product" ? 79 : 357} V${c.id === "c-product" ? 89 : 367}`
                    : `M${c.oneX} ${c.id === "c-date" ? 79 : 357} V${c.id === "c-date" ? 89 : 367} M${c.oneX - 4} ${c.id === "c-date" ? 79 : 357} V${c.id === "c-date" ? 89 : 367}`
                }
              />
              {/* crow's foot ("many") at the fact end */}
              <path
                d={
                  c.side === "left"
                    ? `M205 ${c.y} L215 ${c.y - 5} M205 ${c.y} L215 ${c.y + 5}`
                    : `M395 ${c.y} L385 ${c.y - 5} M395 ${c.y} L385 ${c.y + 5}`
                }
              />
            </motion.g>
          </g>
        ))}

        {/* Tables */}
        {[...dims, fact].map((t, i) => {
          const isFact = t.id === fact.id;
          const h = HEAD + t.rows.length * ROW;
          const delay = isFact ? 0.35 : 0.5 + i * 0.1;
          return (
            <g key={t.id}>
              <motion.rect
                x={t.x}
                y={t.y}
                width={t.w}
                height={h}
                fill="var(--diagram-node-bg)"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.92 } }}
                transition={appear(delay + 0.4)}
              />
              <motion.rect
                x={t.x}
                y={t.y}
                width={t.w}
                height={HEAD}
                fill={isFact ? "var(--diagram-signal)" : "var(--diagram-flow)"}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: isFact ? 0.16 : 0.12 } }}
                transition={appear(delay + 0.5)}
              />
              <motion.path
                d={tablePath(t)}
                fill="none"
                stroke={isFact ? "var(--diagram-signal)" : "var(--diagram-stroke)"}
                strokeWidth={isFact ? 1.5 : 1.25}
                variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
                transition={draw(delay, 0.9)}
              />
              <motion.g
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={appear(delay + 0.6)}
                style={mono}
              >
                <line
                  x1={t.x}
                  x2={t.x + t.w}
                  y1={t.y + HEAD}
                  y2={t.y + HEAD}
                  stroke={isFact ? "var(--diagram-signal)" : "var(--diagram-stroke)"}
                  strokeOpacity="0.6"
                />
                <text x={t.x + 9} y={t.y + 16} fontSize="10" fontWeight="600" fill="var(--foreground)">
                  {t.id}
                </text>
                {t.rows.map((r, ri) => (
                  <g key={r.label}>
                    <text
                      x={t.x + 9}
                      y={t.y + HEAD + 12 + ri * ROW}
                      fontSize="9.5"
                      fill={r.signal ? "var(--diagram-signal)" : "var(--diagram-text)"}
                    >
                      {r.label}
                    </text>
                    {r.key ? (
                      <text
                        x={t.x + t.w - 9}
                        y={t.y + HEAD + 12 + ri * ROW}
                        fontSize="8.5"
                        textAnchor="end"
                        fill={r.key === "PK" ? "var(--diagram-signal)" : "var(--diagram-flow)"}
                      >
                        {r.key}
                      </text>
                    ) : null}
                  </g>
                ))}
              </motion.g>
            </g>
          );
        })}

        {/* Callout above the fact table */}
        <motion.g
          variants={{ hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0 } }}
          transition={appear(2.1)}
          style={mono}
        >
          <path d="M300 160 V170" stroke="var(--diagram-signal)" strokeWidth="1" />
          <rect x="226" y="146" width="148" height="15" rx="2" fill="var(--background)" stroke="var(--diagram-signal)" strokeOpacity="0.5" />
          <text x="300" y="157" textAnchor="middle" fontSize="8.5" letterSpacing="0.6" fill="var(--diagram-signal)">
            14 RULES ENFORCED IN POSTGRES
          </text>
        </motion.g>

        {/* Nota evaluation bars */}
        <motion.g
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={appear(1.6)}
          style={mono}
        >
          <text x="196" y="56" fontSize="8.5" letterSpacing="1.2" fill="var(--diagram-text)">
            NOTA.EVAL · ACCURACY %
          </text>
          <line x1="196" x2="404" y1={BAR_BASE} y2={BAR_BASE} stroke="var(--diagram-stroke)" strokeOpacity="0.7" />
          <line
            x1="196"
            x2="404"
            y1={BAR_BASE - BAR_MAX}
            y2={BAR_BASE - BAR_MAX}
            stroke="var(--diagram-stroke-faint)"
            strokeDasharray="2 4"
          />
        </motion.g>
        {bars.map((b, i) => {
          const h = (b.value / 100) * BAR_MAX;
          return (
            <g key={b.label} style={mono}>
              <motion.rect
                x={b.x}
                y={BAR_BASE - h}
                width="36"
                height={h}
                fill="var(--diagram-flow)"
                fillOpacity="0.22"
                stroke="var(--diagram-flow)"
                strokeWidth="1"
                style={{ originY: 1 }}
                variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
                transition={{ delay: 1.7 + i * 0.12, duration: 0.8, ease: EASE_OUT }}
              />
              <motion.text
                x={b.x + 18}
                y={BAR_BASE - h - 5}
                textAnchor="middle"
                fontSize="9"
                fill="var(--foreground)"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={appear(2.3 + i * 0.1)}
              >
                {b.value}
              </motion.text>
              <motion.text
                x={b.x + 18}
                y={BAR_BASE + 12}
                textAnchor="middle"
                fontSize="7.5"
                letterSpacing="0.8"
                fill="var(--diagram-text)"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={appear(1.9)}
              >
                {b.label}
              </motion.text>
            </g>
          );
        })}

        {/* Pipeline and feed into the fact table */}
        <motion.path
          d={FEED}
          fill="none"
          stroke="var(--diagram-flow)"
          strokeWidth="1.25"
          strokeOpacity="0.85"
          markerEnd="url(#hd-arrow)"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={draw(1.4, 1.2)}
        />
        <motion.text
          x="308"
          y="392"
          fontSize="8.5"
          letterSpacing="1.2"
          fill="var(--diagram-flow)"
          style={mono}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={appear(2.4)}
        >
          LOAD
        </motion.text>
        <motion.text
          x="20"
          y="446"
          fontSize="8.5"
          letterSpacing="1.2"
          fill="var(--diagram-text)"
          style={mono}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={appear(1.5)}
        >
          NOTA.PIPELINE
        </motion.text>
        {pipeline.map((n, i) => (
          <motion.g
            key={n.label}
            style={mono}
            variants={{ hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ delay: 1.5 + i * 0.12, duration: 0.45, ease: EASE_OUT }}
          >
            <circle cx={n.x} cy="468" r="7" fill="var(--background)" stroke="var(--diagram-flow)" strokeWidth="1.25" />
            <circle cx={n.x} cy="468" r="2.5" fill="var(--diagram-flow)" />
            <text x={n.x} y="492" textAnchor="middle" fontSize="8" letterSpacing="1" fill="var(--diagram-text)">
              {n.label}
            </text>
          </motion.g>
        ))}

        {/* Data packets, only after the drawing settles */}
        {flowing && !reduce ? (
          <g filter="url(#hd-glow)">
            {connectors.map((c, i) => (
              <circle key={c.id} r="2.6" fill="var(--diagram-flow)" opacity="0">
                <animateMotion dur="3.6s" begin={`${i * 0.9}s`} repeatCount="indefinite" path={c.d} />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.12;0.82;1"
                  dur="3.6s"
                  begin={`${i * 0.9}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
            {[0, 2.2].map((offset) => (
              <circle key={offset} r="3.2" fill="var(--diagram-signal)" opacity="0">
                <animateMotion dur="4.4s" begin={`${offset}s`} repeatCount="indefinite" path={FEED} />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.08;0.9;1"
                  dur="4.4s"
                  begin={`${offset}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        ) : null}
      </motion.g>
    </svg>
  );
}
