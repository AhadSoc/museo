"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { splitChars, splitWords } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  splitBy?: "chars" | "words";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** "mount" fires immediately; "manual" waits for `play` to flip true. */
  trigger?: "mount" | "manual";
  play?: boolean;
}

/**
 * Renders text pre-clipped below its own baseline, then reveals each
 * unit (character or word) with a staggered rise + fade. Used for all
 * major headings across the archive.
 */
export default function RevealText({
  text,
  as = "span",
  splitBy = "words",
  className = "",
  delay = 0,
  stagger = 0.035,
  duration = 0.9,
  trigger = "mount",
  play = true,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const Tag = as as any;

  const units = splitBy === "chars" ? splitChars(text) : splitWords(text);

  useEffect(() => {
    if (trigger === "manual" && !play) return;
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>("[data-reveal-inner]");
    gsap.fromTo(
      items,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: "power4.out",
      }
    );
  }, [trigger, play, delay, stagger, duration]);

  return (
    <Tag ref={containerRef} className={className}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "top" }}
        >
          <span
            data-reveal-inner
            className="inline-block will-change-transform"
            style={{ transform: "translateY(110%)", opacity: 0 }}
          >
            {unit === " " ? "\u00A0" : unit}
            {splitBy === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
