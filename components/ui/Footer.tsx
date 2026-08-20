"use client";

import TransitionLink from "@/components/transitions/TransitionLink";
import { useCursorHover } from "@/hooks/useCursorHover";

const LINKS = [
  { label: "COLLECTION", href: "/collection" },
  { label: "ARTISTS", href: "/artists" },
  { label: "EXHIBITIONS", href: "/exhibitions" },
  { label: "ARCHIVE", href: "/map" },
  { label: "ABOUT", href: "/about" },
];

export default function Footer() {
  const openCursor = useCursorHover("open");

  return (
    <footer className="relative border-t border-parchment/10 bg-void px-6 pb-10 pt-16 md:px-12 md:pb-14 md:pt-24">
      <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-editorial text-3xl uppercase tracking-[0.15em] text-parchment md:text-4xl">
            Museo
          </span>
          <p className="mt-3 max-w-xs font-sans text-xs leading-relaxed text-ash">
            A fictional digital institution dedicated to preserving and exploring Renaissance art.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {LINKS.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              label={link.label}
              cursor="open"
              className="font-sans text-[11px] uppercase tracking-widest2 text-ash transition-colors duration-300 hover:text-gilt"
              {...openCursor}
            >
              {link.label}
            </TransitionLink>
          ))}
        </nav>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-parchment/10 pt-6 font-sans text-[10px] uppercase tracking-widest2 text-ash md:flex-row md:items-center md:justify-between">
        <span>© Museo — The Renaissance Archive, Est. MMXXIV</span>
        <span>A fictional archive. Built for the screen, not the wall.</span>
      </div>
    </footer>
  );
}
