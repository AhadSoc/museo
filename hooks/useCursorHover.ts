"use client";

import { useCursor, type CursorLabel } from "@/components/cursor/CursorContext";

/** Returns pointer handlers that set/clear the global cursor label on hover. */
export function useCursorHover(label: CursorLabel) {
  const { setCursor, clearCursor } = useCursor();
  return {
    onPointerEnter: () => setCursor(label),
    onPointerLeave: () => clearCursor(),
  };
}
