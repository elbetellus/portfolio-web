"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

function parts(value: string) {
  const match = value.match(/-?\d+(\.\d+)?/);
  if (!match || match.index === undefined) return null;
  const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;
  return {
    prefix: value.slice(0, match.index),
    target: parseFloat(match[0]),
    decimals,
    suffix: value.slice(match.index + match[0].length),
  };
}

export function CountUp({ value, duration = 1.2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const parsed = parts(value);
  const [display, setDisplay] = useState(
    parsed ? `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}` : value,
  );

  useEffect(() => {
    if (!isInView || !parsed) return;
    const controls = animate(0, parsed.target, {
      duration,
      ease: "easeOut",
      onUpdate(current) {
        setDisplay(`${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
