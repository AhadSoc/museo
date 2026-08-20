"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export type CursorLabel = "view" | "open" | "close" | "drag" | "play" | null;

interface CursorContextValue {
  setCursor: (label: CursorLabel) => void;
  clearCursor: () => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

/** Internal store the visual CustomCursor subscribes to, kept outside React state for perf. */
export const cursorStore = {
  label: null as CursorLabel,
  listeners: new Set<(label: CursorLabel) => void>(),
  set(label: CursorLabel) {
    this.label = label;
    this.listeners.forEach((l) => l(label));
  },
  subscribe(fn: (label: CursorLabel) => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  },
};

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const depthRef = useRef(0);

  const setCursor = useCallback((label: CursorLabel) => {
    depthRef.current += 1;
    cursorStore.set(label);
  }, []);

  const clearCursor = useCallback(() => {
    depthRef.current = Math.max(0, depthRef.current - 1);
    if (depthRef.current === 0) cursorStore.set(null);
  }, []);

  const value = useMemo(() => ({ setCursor, clearCursor }), [setCursor, clearCursor]);

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
