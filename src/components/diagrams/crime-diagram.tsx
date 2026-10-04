"use client";

import { motion } from "framer-motion";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { C, DiagramFrame, mono, useDiagram } from "./diagram-kit";

/*
  The star schema draws itself once, then the four slicers take turns: each one
  sends a pulse from its dimension into the fact table and the measures recalculate.
  Loop: 8 seconds, 2 per slicer.
*/
const FACT = { x: 300, y: 128, w: 170, h: 120 };
const dims = [
  { id: "Calendar", x: 60, y: 70 },
  { id: "Location", x: 560, y: 70 },
  { id: "Crime Type", x: 40, y: 168 },
  { id: "Officer", x: 60, y: 290 },
  { id: "Victim", x: 560, y: 290 },
];
const DW = 150;
const DH = 40;

function linkPath(d: { x: number; y: number }) {
  const cx = d.x + DW / 2;
  const cy = d.y + DH / 2;
  const left = cx < FACT.x;
  const fx = left ? FACT.x : FACT.x + FACT.w;
  const fy = Math.min(Math.max(cy, FACT.y + 14), FACT.y + FACT.h - 14);
  const sx = left ? d.x + DW : d.x;
  const mid = (sx + fx) / 2;
  return `M${sx} ${cy} H${mid} V${fy} H${fx}`;
}

const slicers = ["Year", "Severity", "Category", "Province"];
// Which dimension each slicer filters (Severity and Category both live in Crime Type).
const slicerDim = ["Calendar", "Crime Type", "Crime Type", "Location"];
const LOOP = 8;

export function CrimeDiagram({ title, caption }: { title: string; caption: string }) {
  const { ref, live, seen, reduce } = useDiagram();
  const show = seen ? "visible" : "hidden";
  const anim = reduce ? false : "hidden";

  return (
    <DiagramFrame title={title} caption={caption} frameRef={ref} minWidth={660}>
      <svg viewBox="0 0 760 360" className="h-auto w-full" role="img" aria-label="Diagram: a crime reports fact table connected to Calendar, Location, Crime Type, Officer, and Victim dimensions. Four slicers each filter a dimension and the measures recalculate.">
        <motion.g style={mono} initial={anim} animate={show}>
          {dims.map((d, i) => (
            <g key={d.id}>
              <motion.path
                d={linkPath(d)}
                fill="none"
                stroke={C.stroke}
                strokeWidth="1.25"
                variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
                transition={{ pathLength: { delay: 0.5 + i * 0.1, duration: 0.8, ease: EASE_IN_OUT }, opacity: { delay: 0.5 + i * 0.1, duration: 0.01 } }}
              />
              <motion.g
                variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: EASE_OUT }}
              >
                <rect x={d.x} y={d.y} width={DW} height={DH} rx="3" fill={C.node} stroke={C.stroke} />
                <text x={d.x + 12} y={d.y + 25} fontSize="11.5" fill={C.fg}>
                  dim_{d.id.toLowerCase().replace(" ", "_")}
                </text>
              </motion.g>
            </g>
          ))}

          <motion.g
            variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <rect x={FACT.x} y={FACT.y} width={FACT.w} height={FACT.h} rx="4" fill={C.node} stroke={C.signal} strokeWidth="1.5" />
            <rect x={FACT.x} y={FACT.y} width={FACT.w} height="26" rx="4" fill={C.signal} fillOpacity="0.16" />
            <text x={FACT.x + 12} y={FACT.y + 17} fontSize="11" fontWeight="600" fill={C.fg}>
              fct_crime_reports
            </text>
            {["avg_response_time", "solve_rate", "arrests_per_case"].map((m, i) => (
              <text key={m} x={FACT.x + 12} y={FACT.y + 50 + i * 20} fontSize="10.5" fill={C.text}>
                <tspan fill={C.flow}>Σ </tspan>
                {m}
              </text>
            ))}
          </motion.g>

          {/* Slicer chips */}
          <motion.g
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <text x="236" y="29" fontSize="9.5" letterSpacing="1.4" fill={C.text}>
              SLICERS
            </text>
            {slicers.map((s, i) => (
              <g key={s}>
                <rect x={300 + i * 84} y="14" width="76" height="22" rx="11" fill="none" stroke={C.stroke} />
                <text x={338 + i * 84} y="29" fontSize="10" textAnchor="middle" fill={C.fg}>
                  {s}
                </text>
              </g>
            ))}
          </motion.g>
        </motion.g>

        {live ? (
          <g style={mono}>
            {slicers.map((s, i) => {
              const d = dims.find((x) => x.id === slicerDim[i])!;
              const start = i / slicers.length;
              const end = start + 1 / slicers.length;
              const times = [0, start, start + 0.02, end - 0.04, end, 1].map((t) => Math.min(Math.max(t, 0), 1));
              return (
                <g key={s}>
                  <motion.rect
                    x={300 + i * 84}
                    y="14"
                    width="76"
                    height="22"
                    rx="11"
                    fill={C.flow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 0.3, 0.3, 0, 0] }}
                    transition={{ duration: LOOP, times, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.rect
                    x={d.x}
                    y={d.y}
                    width={DW}
                    height={DH}
                    rx="3"
                    fill="none"
                    stroke={C.flow}
                    strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                    transition={{ duration: LOOP, times, repeat: Infinity, ease: "linear" }}
                  />
                  <circle r="3.5" fill={C.flow} opacity="0">
                    <animateMotion
                      path={linkPath(d)}
                      dur={`${LOOP}s`}
                      repeatCount="indefinite"
                      keyPoints="0;0;1;1"
                      keyTimes={`0;${start.toFixed(3)};${(start + 0.12).toFixed(3)};1`}
                      calcMode="linear"
                    />
                    <animate
                      attributeName="opacity"
                      dur={`${LOOP}s`}
                      repeatCount="indefinite"
                      values="0;0;1;1;0;0"
                      keyTimes={`0;${start.toFixed(3)};${(start + 0.01).toFixed(3)};${(start + 0.12).toFixed(3)};${(start + 0.13).toFixed(3)};1`}
                    />
                  </circle>
                </g>
              );
            })}
            <motion.rect
              x={FACT.x}
              y={FACT.y + 32}
              width={FACT.w}
              height={FACT.h - 38}
              fill={C.flow}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.12, 0, 0, 0.12, 0, 0, 0.12, 0, 0, 0.12, 0] }}
              transition={{
                duration: LOOP,
                times: [0, 0.12, 0.14, 0.2, 0.37, 0.39, 0.45, 0.62, 0.64, 0.7, 0.87, 0.89, 0.95],
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>
        ) : null}
      </svg>
    </DiagramFrame>
  );
}
