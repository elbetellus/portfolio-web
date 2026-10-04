"use client";

import { motion } from "framer-motion";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { C, DiagramFrame, mono, useDiagram } from "./diagram-kit";

/*
  A note travels through seven modules. The confidence bar can only shrink:
  it drops at READ (the handwriting was unclear), stays capped through MATCH
  even though a product was found, and the line arrives at CORRECT flagged.
  Loop: 8 seconds.
*/
const LOOP = 8;
const modules = [
  { id: "A", name: "Capture" },
  { id: "B", name: "Read" },
  { id: "C", name: "Match" },
  { id: "D", name: "Validate" },
  { id: "E", name: "Correct" },
  { id: "F", name: "Save" },
  { id: "G", name: "Evaluate" },
];
const W = 88;
const GAP = 16;
const X0 = 24;
const BOX_Y = 92;
const BOX_H = 64;
const cx = (i: number) => X0 + i * (W + GAP) + W / 2;

/** Time (0..1) at which the note sits on module i. */
const at = (i: number) => 0.04 + i * 0.12;

export function NotaDiagram({ title, caption }: { title: string; caption: string }) {
  const { ref, live, seen, reduce } = useDiagram();
  const xs = modules.map((_, i) => cx(i) - cx(0));
  const times = modules.map((_, i) => at(i));

  return (
    <DiagramFrame title={title} caption={caption} frameRef={ref} minWidth={700}>
      <svg viewBox="0 0 760 300" className="h-auto w-full" role="img" aria-label="Diagram: seven modules from capture to evaluate. Confidence drops at the read step and never rises again, so an uncertain line reaches the correction step still flagged.">
        <motion.g
          style={mono}
          initial={{ opacity: 0 }}
          animate={{ opacity: seen ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {modules.map((m, i) => {
            const x = X0 + i * (W + GAP);
            const reviewer = m.id === "E";
            return (
              <g key={m.id}>
                {i > 0 ? (
                  <line x1={x - GAP} x2={x} y1={BOX_Y + BOX_H / 2} y2={BOX_Y + BOX_H / 2} stroke={C.stroke} />
                ) : null}
                <rect
                  x={x}
                  y={BOX_Y}
                  width={W}
                  height={BOX_H}
                  rx="4"
                  fill={C.node}
                  stroke={reviewer ? C.signal : C.stroke}
                  strokeWidth="1.25"
                />
                <text x={x + 10} y={BOX_Y + 20} fontSize="10" fill={reviewer ? C.signal : C.flow}>
                  {m.id}
                </text>
                <text x={x + 10} y={BOX_Y + 44} fontSize="11.5" fill={C.fg}>
                  {m.name}
                </text>
              </g>
            );
          })}

          {/* Confidence gauge */}
          <text x={X0} y="210" fontSize="10" letterSpacing="1.4" fill={C.text}>
            CONFIDENCE OF ONE LINE
          </text>
          <rect x={X0} y="220" width="712" height="12" rx="2" fill="none" stroke={C.faint} />
          {["HIGH", "MEDIUM", "LOW"].map((l, i) => (
            <text key={l} x={X0 + 712 - i * 237 - 4} y="252" fontSize="9" textAnchor="end" fill={C.text}>
              {l}
            </text>
          ))}
          <text x={X0} y="276" fontSize="10" fill={C.text}>
            Can drop at any module. Never rises again.
          </text>

          <text x={X0} y="50" fontSize="10" fill={C.text}>
            EXAMPLE HANDWRITTEN LINE
          </text>
          <text x={X0} y="68" fontSize="12" fill={C.fg}>
            &quot;dndeng sapi  2&quot;
          </text>
        </motion.g>

        {reduce || !live ? (
          <g style={mono}>
            <rect x={X0 + 1} y="221" width={reduce ? 440 : 710} height="10" rx="1.5" fill={reduce ? C.signal : C.flow} fillOpacity="0.55" />
          </g>
        ) : (
          <g style={mono}>
            {/* Confidence fill: full, drops at READ, stays capped after */}
            <motion.rect
              x={X0 + 1}
              y="221"
              width="710"
              height="10"
              rx="1.5"
              fill={C.flow}
              fillOpacity="0.6"
              style={{ originX: 0 }}
              animate={{ scaleX: [1, 1, 0.62, 0.62, 0.62, 1] }}
              transition={{ duration: LOOP, times: [0, at(1), at(1) + 0.05, at(4), 0.97, 1], repeat: Infinity, ease: EASE_IN_OUT }}
            />
            <motion.rect
              x={X0 + 1}
              y="221"
              height="10"
              rx="1.5"
              fill={C.signal}
              fillOpacity="0.75"
              width="440"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: LOOP, times: [0, at(4) - 0.02, at(4), 0.95, 1], repeat: Infinity, ease: "linear" }}
            />

            {/* A blocked attempt to raise confidence at MATCH */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: LOOP, times: [0, at(2) - 0.01, at(2) + 0.02, at(3), at(3) + 0.03], repeat: Infinity, ease: "linear" }}
            >
              <text x={cx(2)} y="186" fontSize="9.5" textAnchor="middle" fill={C.text}>
                matched &quot;Dendeng Sapi&quot;
              </text>
              <text x={cx(2)} y="200" fontSize="9.5" textAnchor="middle" fill={C.block}>
                confidence stays capped
              </text>
            </motion.g>

            {/* Flag at CORRECT */}
            <motion.g
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 6] }}
              transition={{ duration: LOOP, times: [0, at(4) - 0.01, at(4) + 0.02, 0.94, 1], repeat: Infinity, ease: EASE_OUT }}
            >
              <path d={`M${cx(4)} 58 V${BOX_Y - 26}`} stroke={C.signal} strokeDasharray="2 3" />
              <rect x={cx(4) - 54} y="36" width="108" height="22" rx="3" fill={C.bg} stroke={C.signal} />
              <text x={cx(4)} y="51" fontSize="9.5" textAnchor="middle" fill={C.signal}>
                flagged for review
              </text>
            </motion.g>

            {/* The note itself */}
            <motion.g
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, ...xs, xs[xs.length - 1]], opacity: [0, ...modules.map(() => 1), 0] }}
              transition={{
                duration: LOOP,
                times: [0, ...times, 0.92],
                repeat: Infinity,
                ease: EASE_IN_OUT,
              }}
            >
              <rect x={cx(0) - 9} y={BOX_Y - 22} width="18" height="14" rx="2" fill={C.signal} />
              <path d={`M${cx(0) - 5} ${BOX_Y - 17} h10 M${cx(0) - 5} ${BOX_Y - 13} h7`} stroke="var(--primary-foreground)" strokeWidth="1.2" />
            </motion.g>
          </g>
        )}
      </svg>
    </DiagramFrame>
  );
}
