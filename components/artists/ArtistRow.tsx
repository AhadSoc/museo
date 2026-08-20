"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import type { Artist } from "@/data/artists";
import { gsap } from "@/lib/gsap";
import { useCursorHover } from "@/hooks/useCursorHover";
import { pageTransitionStore } from "@/lib/pageTransitionStore";

interface ArtistRowProps {
  artist: Artist;
  index: string;
}

export default function ArtistRow({ artist, index }: ArtistRowProps) {
  const router = useRouter();
  const plateRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const viewCursor = useCursorHover("open");

  const handleEnter = () => {
    gsap.to(plateRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" });
    gsap.to(rowRef.current, { paddingLeft: 24, duration: 0.5, ease: "power3.out" });
  };
  const handleLeave = () => {
    gsap.to(plateRef.current, { opacity: 0, scale: 0.85, duration: 0.4, ease: "power3.in" });
    gsap.to(rowRef.current, { paddingLeft: 0, duration: 0.5, ease: "power3.out" });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pageTransitionStore.phase !== "idle") return;
    pageTransitionStore.cover({ mode: "room", label: artist.surname });
    setTimeout(() => router.push(`/artists/${artist.slug}`), 550);
  };

  return (
    <a
      href={`/artists/${artist.slug}`}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative block border-b border-parchment/10"
      {...viewCursor}
    >
      <div
        ref={rowRef}
        className="relative flex items-center justify-between gap-6 py-8 transition-colors duration-500 md:py-12"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse 60% 100% at 15% 50%, ${artist.accent}22, transparent 70%)`,
          }}
        />
        <div className="flex items-baseline gap-4 md:gap-10">
          <span className="font-sans text-xs text-gilt">{index}</span>
          <div className="leading-[0.92]">
            <h3 className="font-display text-4xl uppercase tracking-tightest text-parchment transition-colors duration-500 group-hover:text-gilt md:text-7xl">
              {artist.firstName}
            </h3>
            <h3 className="font-display text-4xl uppercase tracking-tightest text-ash/70 md:text-7xl">
              {artist.surname}
            </h3>
          </div>
        </div>

        <div className="hidden flex-col items-end gap-1 font-sans text-[10px] uppercase tracking-widest2 text-ash md:flex">
          <span>{artist.years}</span>
          <span>{artist.region}</span>
        </div>
      </div>

      {/* Monogram plate, revealed on hover */}
      <div
        ref={plateRef}
        className="pointer-events-none absolute right-6 top-1/2 hidden h-24 w-24 -translate-y-1/2 scale-75 items-center justify-center rounded-full border border-parchment/20 opacity-0 md:right-16 md:flex md:h-32 md:w-32"
        style={{ background: `radial-gradient(circle, ${artist.accent}33, transparent 70%)` }}
      >
        <span className="font-editorial text-2xl uppercase tracking-widest text-parchment md:text-3xl">
          {artist.monogram}
        </span>
      </div>
    </a>
  );
}
