"use client";

import { motion } from "framer-motion";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { C, DiagramFrame, mono, useDiagram } from "./diagram-kit";

/*
  Two sales travel the same path: screen, API, RLS policies, triggers, tables.
  A sale of 3 passes and stock drops 24 to 21. A sale of 30 passes RLS but the
  trigger rejects it, because stock cannot go negative. Loop: 9 seconds.
*/
const LOOP = 9;
const Y = 196;

function loop(times: number[], ease: typeof EASE_IN_OUT | "linear" = EASE_IN_OUT) {
  return { duration: LOOP, times, repeat: Infinity, ease };
}

function Gate({ x, label }: { x: number; label: string }) {
  return (
    <g style={mono}>
      <line x1={x} x2={x} y1="96" y2="300" stroke={C.stroke} strokeDasharray="4 4" />
      <rect x={x - 34} y="78" width="68" height="18" rx="2" fill={C.bg} stroke={C.stroke} />
      <text x={x} y="91" textAnchor="middle" fontSize="10" letterSpacing="1" fill={C.fg}>
        {label}
      </text>
    </g>
  );
}

function Flash({ x, color, times }: { x: number; color: string; times: number[] }) {
  return (
    <motion.rect
      x={x - 6}
      y="96"
      width="12"
      height="204"
      rx="3"
      fill={color}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 0.55, 0, 0] }}
      transition={loop(times, "linear")}
    />
  );
}

export function OmcDiagram({ title, caption }: { title: string; caption: string }) {
  const { ref, live, seen, reduce } = useDiagram();

  return (
    <DiagramFrame title={title} caption={caption} frameRef={ref} minWidth={680}>
      <svg viewBox="0 0 760 360" className="h-auto w-full" role="img" aria-label="Diagram: a sale request travels from the app screen through the API, row-level security, and database triggers into the stock tables. A sale of 3 is accepted; a sale of 30 is rejected by a trigger because stock cannot go negative.">
        <defs>
          <marker id="omc-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill={C.stroke} />
          </marker>
        </defs>

        <motion.g initial={{ opacity: 0 }} animate={{ opacity: seen ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE_OUT }}>
          {/* Phone */}
          <g style={mono}>
            <rect x="40" y="104" width="96" height="184" rx="14" fill={C.node} stroke={C.stroke} strokeWidth="1.25" />
            <rect x="74" y="112" width="28" height="4" rx="2" fill={C.faint} />
            <text x="52" y="140" fontSize="9" fill={C.text}>BARANG KELUAR</text>
            <rect x="52" y="150" width="72" height="20" rx="3" fill="none" stroke={C.faint} />
            <text x="57" y="164" fontSize="8.5" fill={C.fg}>Ayam Kalasan</text>
            <rect x="52" y="178" width="72" height="20" rx="3" fill="none" stroke={C.faint} />
            <text x="58" y="192" fontSize="9" fill={C.fg}>qty</text>
            <rect x="52" y="248" width="72" height="22" rx="3" fill={C.signal} fillOpacity="0.85" />
            <text x="88" y="263" fontSize="9" textAnchor="middle" fill="var(--primary-foreground)">SIMPAN</text>
            <text x="88" y="316" fontSize="10" textAnchor="middle" letterSpacing="1" fill={C.text}>APP SCREEN</text>
          </g>

          {/* API */}
          <g style={mono}>
            <line x1="136" x2="196" y1={Y} y2={Y} stroke={C.stroke} markerEnd="url(#omc-arrow)" />
            <rect x="200" y="168" width="112" height="56" rx="4" fill={C.node} stroke={C.stroke} strokeWidth="1.25" />
            <text x="256" y="193" fontSize="10" textAnchor="middle" fill={C.fg}>SUPABASE</text>
            <text x="256" y="208" fontSize="10" textAnchor="middle" fill={C.text}>API</text>
            <line x1="312" x2="372" y1={Y} y2={Y} stroke={C.stroke} markerEnd="url(#omc-arrow)" />
          </g>

          {/* Database container */}
          <g style={mono}>
            <rect x="376" y="48" width="364" height="290" rx="6" fill="none" stroke={C.signal} strokeOpacity="0.7" strokeWidth="1.25" />
            <rect x="388" y="40" width="88" height="16" fill={C.bg} />
            <text x="394" y="52" fontSize="10" letterSpacing="1.5" fill={C.signal}>POSTGRES</text>
          </g>
          <Gate x={420} label="RLS" />
          <Gate x={500} label="TRIGGERS" />
          <line x1="376" x2="560" y1={Y} y2={Y} stroke={C.faint} />

          {/* Tables */}
          <g style={mono}>
            <rect x="566" y="78" width="160" height="70" rx="3" fill={C.node} stroke={C.stroke} />
            <text x="576" y="96" fontSize="10" fontWeight="600" fill={C.fg}>produk</text>
            <line x1="566" x2="726" y1="104" y2="104" stroke={C.faint} />
            <text x="576" y="128" fontSize="10" fill={C.text}>stok_gudang</text>

            <rect x="566" y="164" width="160" height="70" rx="3" fill={C.node} stroke={C.stroke} />
            <text x="576" y="182" fontSize="10" fontWeight="600" fill={C.fg}>transaksi_keluar</text>
            <line x1="566" x2="726" y1="190" y2="190" stroke={C.faint} />
            <text x="576" y="210" fontSize="9" fill={C.text}>#1203  qty 5</text>

            <rect x="566" y="250" width="160" height="70" rx="3" fill={C.node} stroke={C.stroke} />
            <text x="576" y="268" fontSize="10" fontWeight="600" fill={C.fg}>log_perubahan</text>
            <line x1="566" x2="726" y1="276" y2="276" stroke={C.faint} />
            <text x="576" y="298" fontSize="9" fill={C.text}>insert only, no delete</text>
            <rect x="700" y="258" width="16" height="12" rx="2" fill="none" stroke={C.signal} />
          </g>
        </motion.g>

        {!live && !reduce ? (
          <text x="716" y="128" fontSize="13" fontWeight="600" textAnchor="end" fill={C.fg} style={mono}>
            24
          </text>
        ) : null}

        {reduce ? (
          <g style={mono}>
            <text x="680" y="128" fontSize="13" fontWeight="600" textAnchor="end" fill={C.flow}>21</text>
            <text x="576" y="226" fontSize="9" fill={C.flow}>#1204  qty 3</text>
            <text x="440" y="236" fontSize="10" fill={C.block}>qty 30 rejected:</text>
            <text x="440" y="250" fontSize="10" fill={C.block}>stock cannot go negative</text>
          </g>
        ) : null}

        {live ? (
          <g style={mono}>
            {/* Gate flashes */}
            <Flash x={420} color={C.pass} times={[0, 0.16, 0.18, 0.22, 1]} />
            <Flash x={500} color={C.pass} times={[0, 0.23, 0.25, 0.29, 1]} />
            <Flash x={420} color={C.pass} times={[0, 0.64, 0.66, 0.7, 1]} />
            <Flash x={500} color={C.block} times={[0, 0.71, 0.73, 0.82, 1]} />

            {/* Stock counter: 24 then 21 */}
            <motion.text
              x="716"
              y="128"
              fontSize="13"
              fontWeight="600"
              textAnchor="end"
              fill={C.fg}
              animate={{ opacity: [1, 1, 0, 0, 1] }}
              transition={loop([0, 0.3, 0.31, 0.98, 1], "linear")}
            >
              24
            </motion.text>
            <motion.text
              x="716"
              y="128"
              fontSize="13"
              fontWeight="600"
              textAnchor="end"
              fill={C.flow}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={loop([0, 0.3, 0.31, 0.98, 1], "linear")}
            >
              21
            </motion.text>
            <motion.text
              x="576"
              y="226"
              fontSize="9"
              fill={C.flow}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={loop([0, 0.3, 0.33, 0.98, 1], "linear")}
            >
              #1204  qty 3
            </motion.text>

            {/* Sale A: qty 3, accepted */}
            <motion.g
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, 0, 470, 470], opacity: [0, 1, 1, 0] }}
              transition={{
                x: loop([0, 0.02, 0.3, 1]),
                opacity: loop([0, 0.02, 0.31, 0.34], "linear"),
              }}
            >
              <circle cx="96" cy={Y} r="6" fill={C.pass} />
              <text x="96" y={Y - 14} fontSize="10" textAnchor="middle" fill={C.pass}>
                sale qty 3
              </text>
            </motion.g>

            {/* Sale B: qty 30, rejected at the trigger */}
            <motion.g
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, 0, 398, 330, 330], opacity: [0, 0, 1, 1, 0] }}
              transition={{
                x: loop([0, 0.46, 0.71, 0.8, 1]),
                opacity: { duration: LOOP, times: [0, 0.46, 0.48, 0.8, 0.84], repeat: Infinity, ease: "linear" },
              }}
            >
              <circle cx="96" cy={Y} r="6" fill={C.block} />
              <text x="96" y={Y - 14} fontSize="10" textAnchor="middle" fill={C.block}>
                sale qty 30
              </text>
            </motion.g>

            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={loop([0, 0.72, 0.75, 0.95, 1], "linear")}
            >
              <rect x="400" y="226" width="150" height="38" rx="3" fill={C.bg} stroke={C.block} />
              <text x="410" y="242" fontSize="10" fill={C.block}>REJECTED</text>
              <text x="410" y="256" fontSize="9" fill={C.text}>stock cannot go negative</text>
            </motion.g>
          </g>
        ) : null}
      </svg>
    </DiagramFrame>
  );
}
