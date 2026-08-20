"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cursorStore, type CursorLabel } from "./CursorContext";

const LABELS: Record<Exclude<CursorLabel, null>, string> = {
  view: "VIEW",
  open: "OPEN",
  close: "CLOSE",
  drag: "DRAG",
  play: "PLAY",
};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<CursorLabel>(null);
  const [isTouch, setIsTouch] = useState(true);
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    const handleMove = (e: PointerEvent) => {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const handleDown = () => setIsDown(true);
    const handleUp = () => setIsDown(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    const unsubscribe = cursorStore.subscribe(setLabel);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      unsubscribe();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-cursor hidden md:block" aria-hidden="true">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className={`flex items-center justify-center rounded-full border border-parchment/70 transition-[width,height] duration-300 ease-museo-out ${
            label ? "h-20 w-20" : "h-9 w-9"
          } ${isDown ? "scale-90" : "scale-100"}`}
          style={{ transitionProperty: "width, height, transform" }}
        >
          <span
            className={`font-sans text-[10px] tracking-widest2 text-parchment transition-opacity duration-200 ${
              label ? "opacity-100" : "opacity-0"
            }`}
          >
            {label ? LABELS[label] : ""}
          </span>
        </div>
      </div>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div className={`h-1.5 w-1.5 rounded-full bg-parchment transition-opacity duration-200 ${label ? "opacity-0" : "opacity-100"}`} />
      </div>
    </div>
  );
}
