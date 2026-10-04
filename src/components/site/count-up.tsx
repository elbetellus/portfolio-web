"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

function parse(value: string) {
  const match = value.match(/\d+(\.\d+)?/);
  if (!match || match.index === undefined) return null;
  return {
    prefix: value.slice(0, match.index),
    target: parseFloat(match[0]),
    decimals: match[0].includes(".") ? match[0].split(".")[1].length : 0,
    suffix: value.slice(match.index + match[0].length),
  };
}

const noop = () => () => {};

/**
 * Counts a number up once when it enters the viewport.
 * The server render and screen readers always get the final value; only the visual copy animates.
 */
export function CountUp({ value, className, duration = 1.4 }: { value: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const parsed = parse(value);
  const [frame, setFrame] = useState<string | null>(null);

  useEffect(() => {
    if (!parsed || reduce || !inView) return;
    const controls = animate(0, parsed.target, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setFrame(`${parsed.prefix}${v.toFixed(parsed.decimals)}${parsed.suffix}`),
      onComplete: () => setFrame(value),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  const zero = parsed ? `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}` : value;
  const display = !parsed || reduce || !hydrated ? value : (frame ?? zero);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="tabular">
        {display}
      </span>
    </span>
  );
}
