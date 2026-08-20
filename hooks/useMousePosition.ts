"use client";

import { useEffect, useRef } from "react";

export interface MousePosition {
  x: number;
  y: number;
  /** -1 to 1, relative to viewport center */
  nx: number;
  ny: number;
}

/**
 * Tracks the pointer position in a ref (not state) to avoid re-renders.
 * Consumers read `.current` inside rAF loops / GSAP tickers.
 */
export function useMousePositionRef() {
  const position = useRef<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      position.current = {
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / w) * 2 - 1,
        ny: (e.clientY / h) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return position;
}
