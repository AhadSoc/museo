"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useUIState } from "@/components/providers/UIStateProvider";
import { useAppReady } from "@/components/providers/AppReadyContext";
import TransitionLink from "@/components/transitions/TransitionLink";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCursorHover } from "@/hooks/useCursorHover";

const PAGE_LABELS: Record<string, string> = {
  "/": "HOME",
  "/collection": "COLLECTION",
  "/artists": "ARTISTS",
  "/exhibitions": "EXHIBITIONS",
  "/map": "ARCHIVE",
  "/about": "ABOUT",
};

export default function Navigation() {
  const { menuOpen, setMenuOpen, searchOpen, setSearchOpen } = useUIState();
  const { isReady } = useAppReady();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const openCursor = useCursorHover("open");

  useEffect(() => {
    if (!isReady || !rootRef.current) return;
    gsap.fromTo(
      rootRef.current,
      { opacity: 0, yPercent: -20 },
      { opacity: 1, yPercent: 0, duration: 1, ease: "power3.out", delay: 0.1 }
    );
  }, [isReady]);

  const currentLabel = PAGE_LABELS[pathname] ?? "";

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-nav flex items-start justify-between p-6 opacity-0 md:p-10"
    >
      <TransitionLink
        href="/"
        label="MUSEO"
        cursor="open"
        className="pointer-events-auto flex flex-col leading-none"
      >
        <span className="font-editorial text-lg uppercase tracking-[0.2em] text-parchment md:text-xl">
          Museo
        </span>
        <span className="mt-1 font-sans text-[9px] uppercase tracking-widest2 text-ash">
          Renaissance Archive
        </span>
      </TransitionLink>

      <div className="pointer-events-auto flex items-center gap-3">
        {currentLabel && (
          <span className="hidden font-sans text-[10px] uppercase tracking-widest2 text-ash md:inline">
            {currentLabel}
          </span>
        )}
        <span className="hidden h-3 w-px bg-parchment/20 md:inline" />
        <MagneticButton
          onClick={() => setSearchOpen(!searchOpen)}
          className="group h-11 rounded-full border border-parchment/25 px-5 font-sans text-[10px] uppercase tracking-widest2 text-parchment transition-colors duration-300 hover:border-gilt hover:text-gilt"
          {...openCursor}
        >
          {searchOpen ? "Close" : "Search"}
        </MagneticButton>
        <MagneticButton
          onClick={() => setMenuOpen(!menuOpen)}
          className="group flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-parchment/25 transition-colors duration-300 hover:border-gilt"
          aria-label="Toggle navigation"
          {...openCursor}
        >
          <span
            className={`h-px w-4 bg-parchment transition-all duration-300 group-hover:bg-gilt ${
              menuOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-4 bg-parchment transition-all duration-300 group-hover:bg-gilt ${
              menuOpen ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </MagneticButton>
      </div>
    </div>
  );
}
