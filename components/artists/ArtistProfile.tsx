"use client";

import { useEffect, useRef } from "react";
import type { Artist } from "@/data/artists";
import type { Artwork } from "@/data/artworks";
import { gsap } from "@/lib/gsap";
import RevealText from "@/components/ui/RevealText";
import ArtworkCard from "@/components/artwork/ArtworkCard";
import TransitionLink from "@/components/transitions/TransitionLink";
import Footer from "@/components/ui/Footer";

interface ArtistProfileProps {
  artist: Artist;
  works: Artwork[];
}

export default function ArtistProfile({ artist, works }: ArtistProfileProps) {
  const plateRef = useRef<HTMLDivElement | null>(null);
  const bioRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(plateRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2 }, 0.1)
      .fromTo(bioRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.4);
  }, [artist.id]);

  return (
    <main className="relative bg-void pt-28 md:pt-36">
      <div className="px-6 md:px-12">
        <TransitionLink
          href="/artists"
          label="ARTISTS"
          cursor="open"
          className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest2 text-ash transition-colors hover:text-gilt"
        >
          <span>←</span> Back to the Artists
        </TransitionLink>
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-6 py-16 md:grid-cols-12 md:gap-8 md:px-12 md:py-20">
        <div className="md:col-span-7">
          <span className="font-sans text-[10px] uppercase tracking-widest2 text-gilt">
            {artist.years} · {artist.birthplace}
          </span>
          <RevealText
            text={artist.firstName}
            as="h1"
            splitBy="chars"
            stagger={0.02}
            className="mt-3 block font-display text-clamp-hero uppercase leading-[0.85] tracking-tightest text-parchment"
          />
          <RevealText
            text={artist.surname}
            as="h1"
            splitBy="chars"
            stagger={0.02}
            delay={0.15}
            className="block font-display text-clamp-hero uppercase leading-[0.85] tracking-tightest text-ash/60"
          />

          <div ref={bioRef} className="mt-10 flex max-w-xl flex-col gap-6 opacity-0">
            <p className="font-sans text-sm leading-relaxed text-ash md:text-base">{artist.bio}</p>
            <blockquote className="border-l border-gilt/50 pl-5 font-editorial text-xl italic leading-snug text-parchment md:text-2xl">
              &ldquo;{artist.statement}&rdquo;
            </blockquote>
          </div>
        </div>

        <div className="flex items-start justify-center md:col-span-4 md:col-start-9">
          <div
            ref={plateRef}
            className="relative flex aspect-square w-full max-w-xs items-center justify-center overflow-hidden border border-parchment/15 opacity-0"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${artist.accent}44, #0A0806 75%)`,
            }}
          >
            <div className="paper-texture absolute inset-0" />
            <span className="relative font-editorial text-7xl uppercase tracking-widest text-parchment md:text-8xl">
              {artist.monogram}
            </span>
            <span className="absolute bottom-5 left-5 font-sans text-[9px] uppercase tracking-widest2 text-parchment/60">
              Plate — {artist.surname}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 md:px-12">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-sans text-[10px] uppercase tracking-widest2 text-ash">
            Works in the Archive
          </span>
          <span className="hairline w-16" />
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <ArtworkCard key={w.id} artwork={w} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
