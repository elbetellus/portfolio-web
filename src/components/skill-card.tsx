"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { AccentColor } from "@/lib/skills";
import { cn } from "@/lib/utils";

const tintClasses: Record<AccentColor, string> = {
  "chart-1": "bg-chart-1/8 border-chart-1/25",
  "chart-2": "bg-chart-2/8 border-chart-2/25",
  "chart-3": "bg-chart-3/8 border-chart-3/25",
  "chart-4": "bg-chart-4/8 border-chart-4/25",
  "chart-5": "bg-chart-5/8 border-chart-5/25",
  "chart-6": "bg-chart-6/8 border-chart-6/25",
};

const badgeClasses: Record<AccentColor, string> = {
  "chart-1": "bg-chart-1/15 text-chart-1",
  "chart-2": "bg-chart-2/15 text-chart-2",
  "chart-3": "bg-chart-3/15 text-chart-3",
  "chart-4": "bg-chart-4/15 text-chart-4",
  "chart-5": "bg-chart-5/15 text-chart-5",
  "chart-6": "bg-chart-6/15 text-chart-6",
};

interface SkillCardProps {
  title: string;
  description: string;
  color: AccentColor;
  icon: ReactNode;
  index: number;
}

export function SkillCard({ title, description, color, icon, index }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      viewport={{ once: true, margin: "-60px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "rounded-2xl border p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg",
        tintClasses[color],
      )}
    >
      <div
        style={{ transform: "translateZ(30px)" }}
        className={cn(
          "mb-5 flex size-12 items-center justify-center rounded-xl [&>svg]:size-6",
          badgeClasses[color],
        )}
      >
        {icon}
      </div>
      <h3
        style={{ transform: "translateZ(20px)" }}
        className="font-heading text-lg font-semibold text-foreground"
      >
        {title}
      </h3>
      <p
        style={{ transform: "translateZ(20px)" }}
        className="mt-2 text-sm leading-relaxed text-muted-foreground"
      >
        {description}
      </p>
    </motion.div>
  );
}
