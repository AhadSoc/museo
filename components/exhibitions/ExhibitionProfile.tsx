"use client";

import { useEffect, useRef } from "react";
import type { Exhibition } from "@/data/exhibitions";
import type { Artwork } from "@/data/artworks";
import { getRoomBySlug } from "@/data/rooms";
import { gsap } from "@/lib/gsap";
import ArtworkImage from "@/components/artwork/ArtworkImage";
import ArtworkCard from "@/components/artwork/ArtworkCard";
import RevealText from "@/components/ui/RevealText";
import TransitionLink from "@/components/transitions/TransitionLink";
import Footer from "@/components/ui/Footer";

interface ExhibitionProfileProps {
  exhibition: Exhibition;
  cover: Artwork;
  works: Artwork[];
}

export default function ExhibitionProfile({ exhibition, cover, works }: ExhibitionProfileProps) {
  const room = getRoomBySlug(exhibition.roomSlug);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" }
    );
  }, [exhibition.id]);

  return (
    <main className="relative bg-void">
      <div ref={heroRef} className="relative h-[70svh] w-full overflow-hidden bg-umber opacity-0 md:h-[85svh]">
        <ArtworkImage
          src={cover.image.src}
          alt={cover.image.alt}
          accent={cover.accent}
          focal={cover.image.focal}
          title={cover.title}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/20" />

        <div className="absolute left-6 top-24 md:left-12 md:top-28">
          <TransitionLink
            href="/exhibitions"
            label="EXHIBITIONS"
            cursor="open"
            className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest2 text-parchment/80 transition-colors hover:text-gilt"
          >
            <span>←</span> Back to Exhibitions
          </TransitionLink>
        </div>

        <div className="absolute bottom-0 left-0 flex w-full flex-col gap-3 px-6 pb-10 md:px-12 md:pb-16">
          <span className="font-display text-[16vw] uppercase leading-none tracking-tightest text-outline md:text-[8vw]">
            {exhibition.number}
          </span>
          <RevealText
            text={exhibition.title}
            as="h1"
            splitBy="words"
            className="font-display text-clamp-hero uppercase leading-[0.85] tracking-tightest text-parchment"
          />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:gap-8 md:px-12 md:py-24">
        <div className="md:col-span-7">
          <span className="font-sans text-[10px] uppercase tracking-widest2 text-gilt">
            {exhibition.subtitle}
          </span>
          <p className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-ash md:text-base">
            {exhibition.description}
          </p>
        </div>
        <div className="flex flex-col gap-6 font-sans text-[11px] uppercase tracking-widest2 text-ash md:col-span-4 md:col-start-9">
          <div className="flex flex-col gap-1 border-b border-parchment/10 pb-3">
            <span className="text-ash/60">On View</span>
            <span className="text-parchment">{exhibition.dateRange}</span>
          </div>
          {room && (
            <div className="flex flex-col gap-1 border-b border-parchment/10 pb-3">
              <span className="text-ash/60">Room</span>
              <span className="text-parchment">
                {room.number} — {room.name}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-1 border-b border-parchment/10 pb-3">
            <span className="text-ash/60">Works</span>
            <span className="text-parchment">{works.length} pieces on view</span>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 md:px-12">
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
