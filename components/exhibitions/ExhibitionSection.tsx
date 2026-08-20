"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import type { Exhibition } from "@/data/exhibitions";
import { getArtworkBySlug } from "@/data/artworks";
import ArtworkImage from "@/components/artwork/ArtworkImage";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { useCursorHover } from "@/hooks/useCursorHover";
import { pageTransitionStore } from "@/lib/pageTransitionStore";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

interface ExhibitionSectionProps {
  exhibition: Exhibition;
}

export default function ExhibitionSection({ exhibition }: ExhibitionSectionProps) {
  const cover = getArtworkBySlug(exhibition.coverArtworkSlug);
  const router = useRouter();
  const imgParallax = useScrollParallax<HTMLDivElement>(12);
  const viewCursor = useCursorHover("view");
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pageTransitionStore.phase !== "idle") return;
    pageTransitionStore.cover({ mode: "room", label: exhibition.title });
    setTimeout(() => router.push(`/exhibitions/${exhibition.slug}`), 550);
  };

  if (!cover) return null;

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] w-full snap-start items-end overflow-hidden bg-void"
    >
      <div ref={imgParallax} className="absolute inset-0 scale-110">
        <ArtworkImage
          src={cover.image.src}
          alt={cover.image.alt}
          accent={cover.accent}
          focal={cover.image.focal}
          title={cover.title}
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/30" />

      <a
        href={`/exhibitions/${exhibition.slug}`}
        onClick={handleClick}
        className="group relative z-10 flex w-full flex-col gap-6 px-6 pb-16 md:flex-row md:items-end md:justify-between md:px-12 md:pb-20"
        {...viewCursor}
      >
        <div>
          <RevealOnScroll y={30}>
            <span className="font-display text-[22vw] uppercase leading-none tracking-tightest text-outline md:text-[13vw]">
              {exhibition.number}
            </span>
          </RevealOnScroll>
          <RevealOnScroll y={20} delay={0.1}>
            <h2 className="mt-2 font-display text-4xl uppercase leading-[0.9] tracking-tightest text-parchment transition-colors duration-500 group-hover:text-gilt md:text-6xl">
              {exhibition.title}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll y={16} delay={0.18}>
            <p className="mt-3 max-w-md font-sans text-xs uppercase tracking-widest2 text-ash">
              {exhibition.subtitle}
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll y={16} delay={0.24}>
          <div className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-widest2 text-parchment">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-parchment/30 transition-colors duration-300 group-hover:border-gilt group-hover:text-gilt">
              →
            </span>
            Enter Exhibition
          </div>
        </RevealOnScroll>
      </a>
    </section>
  );
}
