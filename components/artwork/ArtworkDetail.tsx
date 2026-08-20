"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import type { Artwork } from "@/data/artworks";
import { getArtistBySlug } from "@/data/artists";
import ArtworkImage from "./ArtworkImage";
import ArtworkCard from "./ArtworkCard";
import RevealText from "@/components/ui/RevealText";
import TransitionLink from "@/components/transitions/TransitionLink";
import Footer from "@/components/ui/Footer";

const ArtworkDistortion = dynamic(() => import("@/components/webgl/ArtworkDistortion"), {
  ssr: false,
});

interface ArtworkDetailProps {
  artwork: Artwork;
  next: Artwork;
}

export default function ArtworkDetail({ artwork, next }: ArtworkDetailProps) {
  const artist = getArtistBySlug(artwork.artistSlug);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(backRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
      .fromTo(heroRef.current, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 1.3 }, 0.05)
      .fromTo(metaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, 0.6);
  }, [artwork.id]);

  return (
    <main className="relative bg-void pt-24 md:pt-28">
      <div ref={backRef} className="px-6 opacity-0 md:px-12">
        <TransitionLink
          href="/collection"
          label="COLLECTION"
          cursor="open"
          className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest2 text-ash transition-colors hover:text-gilt"
        >
          <span>←</span> Back to the Collection
        </TransitionLink>
      </div>

      <div
        ref={heroRef}
        className="relative mx-auto mt-8 aspect-[3/4] w-full max-w-[1400px] overflow-hidden bg-umber opacity-0 md:mt-12 md:aspect-[16/9]"
      >
        <ArtworkImage
          src={artwork.image.src}
          alt={artwork.image.alt}
          accent={artwork.accent}
          focal={artwork.image.focal}
          title={artwork.title}
          priority
          sizes="100vw"
        />
        <ArtworkDistortion
          src={artwork.image.src}
          aspect={1.6}
          className="absolute inset-0 hidden md:block"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
        <span className="absolute left-5 top-5 font-sans text-[10px] uppercase tracking-widest2 text-parchment/70 md:left-8 md:top-8">
          {artwork.archiveNumber}
        </span>
      </div>

      <div
        ref={metaRef}
        className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 opacity-0 md:grid-cols-12 md:gap-6 md:px-12 md:py-24"
      >
        <div className="md:col-span-7">
          <p className="font-sans text-[10px] uppercase tracking-widest2 text-gilt">
            {artist ? `${artist.firstName} ${artist.surname}` : ""} · {artwork.year}
          </p>
          <RevealText
            text={artwork.title}
            as="h1"
            splitBy="words"
            className="mt-3 font-display text-clamp-h1 uppercase leading-[0.9] tracking-tightest text-parchment"
          />
          <p className="mt-8 max-w-xl font-sans text-sm leading-relaxed text-ash md:text-base">
            {artwork.description}
          </p>

          {artist && (
            <TransitionLink
              href={`/artists/${artist.slug}`}
              label={artist.surname}
              cursor="open"
              className="mt-8 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest2 text-parchment transition-colors hover:text-gilt"
            >
              View {artist.firstName} {artist.surname} <span>→</span>
            </TransitionLink>
          )}
        </div>

        <div className="flex flex-col gap-6 font-sans text-[11px] uppercase tracking-widest2 text-ash md:col-span-4 md:col-start-9">
          {[
            ["Year", artwork.year],
            ["Medium", artwork.medium],
            ["Dimensions", artwork.dimensions],
            ["Location", artwork.location],
            ["City", artwork.city],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1 border-b border-parchment/10 pb-3">
              <span className="text-ash/60">{label}</span>
              <span className="text-parchment">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 pb-24 md:px-12">
        <span className="font-sans text-[10px] uppercase tracking-widest2 text-ash">
          Next in the Archive
        </span>
        <div className="mt-6 max-w-sm">
          <ArtworkCard artwork={next} aspect="aspect-[4/5]" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
