"use client";

import { motion } from "framer-motion";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { C, DiagramFrame, mono, useDiagram } from "./diagram-kit";

/*
  Three systems each know the same patient under a different ID. Relationship
  data flows into the hub and the three IDs resolve to one. Clinical data stays
  in the hospital system and is only pulled on demand (dashed line). Loop: 9 s.
*/
const LOOP = 9;
const systems = [
  { name: "Hospital system", sub: "HIS", y: 40, id: "RM-0041" },
  { name: "Patient app", sub: "Care Dokter", y: 150, id: "CD-88210" },
  { name: "CRM", sub: "Marketing", y: 260, id: "CRM-5531" },
];
const SX = 30;
const SW = 190;
const SH = 60;
const HUB = { x: 330, y: 92, w: 180, h: 176 };

const linkTo = (y: number) => {
  const sy = y + SH / 2;
  const hy = Math.min(Math.max(sy, HUB.y + 30), HUB.y + HUB.h - 30);
  return `M${SX + SW} ${sy} H${(SX + SW + HUB.x) / 2} V${hy} H${HUB.x}`;
};

export function CareDiagram({ title, caption }: { title: string; caption: string }) {
  const { ref, live, seen, reduce } = useDiagram();
  const show = seen ? "visible" : "hidden";

  return (
    <DiagramFrame title={title} caption={caption} frameRef={ref} minWidth={660}>
      <svg viewBox="0 0 760 360" className="h-auto w-full" role="img" aria-label="Diagram: the hospital system, the patient app, and the CRM each hold a different ID for the same patient. A patient hub links them to one ID and keeps only relationship data; clinical records stay in the hospital system and are pulled on demand. Duplicates are suggested by AI and decided by records staff.">
        <motion.g style={mono} initial={reduce ? false : "hidden"} animate={show}>
          {systems.map((s, i) => (
            <g key={s.name}>
              <motion.path
                d={linkTo(s.y)}
                fill="none"
                stroke={C.stroke}
                strokeWidth="1.25"
                variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
                transition={{ pathLength: { delay: 0.4 + i * 0.12, duration: 0.8, ease: EASE_IN_OUT }, opacity: { delay: 0.4 + i * 0.12, duration: 0.01 } }}
              />
              <motion.g
                variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: EASE_OUT }}
              >
                <rect x={SX} y={s.y} width={SW} height={SH} rx="4" fill={C.node} stroke={C.stroke} />
                <text x={SX + 12} y={s.y + 24} fontSize="11.5" fill={C.fg}>
                  {s.name}
                </text>
                <text x={SX + 12} y={s.y + 44} fontSize="10" fill={C.text}>
                  {s.sub} · id {s.id}
                </text>
              </motion.g>
            </g>
          ))}

          {/* On-demand clinical pull, HIS to hub */}
          <motion.path
            d={`M${SX + SW} ${40 + 14} C 300 30, 400 40, ${HUB.x + HUB.w / 2} ${HUB.y}`}
            fill="none"
            stroke={C.signal}
            strokeWidth="1.25"
            strokeDasharray="5 5"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.9 } }}
            transition={{ delay: 1.1, duration: 0.6 }}
          />
          <motion.text
            x="300"
            y="26"
            fontSize="9.5"
            fill={C.signal}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            clinical data: pulled on demand, never copied
          </motion.text>

          {/* Hub */}
          <motion.g
            variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE_OUT }}
          >
            <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="6" fill={C.node} stroke={C.flow} strokeWidth="1.5" />
            <rect x={HUB.x} y={HUB.y} width={HUB.w} height="28" rx="6" fill={C.flow} fillOpacity="0.14" />
            <text x={HUB.x + 14} y={HUB.y + 19} fontSize="11" fontWeight="600" fill={C.fg}>
              Patient hub
            </text>
            {["contact", "channel preference", "consent", "schedule", "points"].map((r, i) => (
              <text key={r} x={HUB.x + 14} y={HUB.y + 84 + i * 17} fontSize="10" fill={C.text}>
                {r}
              </text>
            ))}
          </motion.g>

          {/* Duplicate review */}
          <motion.g
            variants={{ hidden: { opacity: 0, x: 8 }, visible: { opacity: 1, x: 0 } }}
            transition={{ delay: 0.9, duration: 0.5, ease: EASE_OUT }}
          >
            <line x1={HUB.x + HUB.w} x2="566" y1="180" y2="180" stroke={C.stroke} strokeDasharray="3 4" />
            <rect x="566" y="120" width="170" height="52" rx="4" fill={C.node} stroke={C.stroke} />
            <text x="578" y="142" fontSize="10.5" fill={C.fg}>AI suggests</text>
            <text x="578" y="159" fontSize="10" fill={C.text}>possible duplicate</text>
            <rect x="566" y="188" width="170" height="52" rx="4" fill={C.node} stroke={C.signal} />
            <text x="578" y="210" fontSize="10.5" fill={C.fg}>Records staff</text>
            <text x="578" y="227" fontSize="10" fill={C.signal}>decide the merge</text>
          </motion.g>
        </motion.g>

        {/* One ID inside the hub */}
        {reduce || !live ? (
          <text x={HUB.x + 14} y={HUB.y + 56} fontSize="14" fontWeight="600" fill={C.flow} style={mono}>
            P-000417
          </text>
        ) : (
          <g style={mono}>
            {systems.map((s, i) => (
              <motion.text
                key={s.id}
                fontSize="11"
                fill={C.flow}
                initial={{ x: SX + SW + 8, y: s.y + 26, opacity: 0 }}
                animate={{
                  x: [SX + SW + 8, SX + SW + 8, HUB.x + 14, HUB.x + 14],
                  y: [s.y + 26, s.y + 26, HUB.y + 56, HUB.y + 56],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: LOOP, times: [0, 0.06 + i * 0.05, 0.36 + i * 0.05, 0.42 + i * 0.05], repeat: Infinity, ease: EASE_IN_OUT }}
              >
                {s.id}
              </motion.text>
            ))}
            <motion.text
              x={HUB.x + 14}
              y={HUB.y + 56}
              fontSize="14"
              fontWeight="600"
              fill={C.flow}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: LOOP, times: [0, 0.5, 0.54, 0.95, 1], repeat: Infinity, ease: "linear" }}
            >
              P-000417
            </motion.text>
            <motion.text
              x={HUB.x + 14}
              y={HUB.y + 70}
              fontSize="9"
              fill={C.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration: LOOP, times: [0, 0.55, 0.6, 0.95, 1], repeat: Infinity, ease: "linear" }}
            >
              3 IDs, 1 patient
            </motion.text>
            <circle r="3.5" fill={C.signal} opacity="0">
              <animateMotion
                path={`M${SX + SW} ${40 + 14} C 300 30, 400 40, ${HUB.x + HUB.w / 2} ${HUB.y}`}
                dur={`${LOOP}s`}
                repeatCount="indefinite"
                keyPoints="0;0;1;1"
                keyTimes="0;0.66;0.8;1"
                calcMode="linear"
              />
              <animate attributeName="opacity" dur={`${LOOP}s`} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.66;0.67;0.8;0.81;1" />
            </circle>
          </g>
        )}
      </svg>
    </DiagramFrame>
  );
}
