"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import type { Artwork } from "@/data/artworks";
import { getArtistBySlug } from "@/data/artists";
import ArtworkImage from "./ArtworkImage";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { useCursorHover } from "@/hooks/useCursorHover";
import { pageTransitionStore } from "@/lib/pageTransitionStore";
import { cn } from "@/lib/utils";

interface EditorialRowProps {
  index: string;
  main: Artwork;
  peek?: Artwork;
  reverse?: boolean;
}

function useArtworkNavigate() {
  const router = useRouter();
  return (artwork: Artwork, el: HTMLElement | null) => {
    if (pageTransitionStore.phase !== "idle") return;
    if (!el) {
      router.push(`/collection/${artwork.slug}`);
      return;
    }
    const rect = el.getBoundingClientRect();
    pageTransitionStore.cover({
      mode: "artwork",
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      src: artwork.image.src,
      alt: artwork.image.alt,
      accent: artwork.accent,
    });
    setTimeout(() => router.push(`/collection/${artwork.slug}`), 700);
  };
}

export default function EditorialRow({ index, main, peek, reverse = false }: EditorialRowProps) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const peekRef = useRef<HTMLDivElement | null>(null);
  const mainParallax = useScrollParallax<HTMLDivElement>(6);
  const peekParallax = useScrollParallax<HTMLDivElement>(14);
  const viewCursor = useCursorHover("view");
  const navigate = useArtworkNavigate();
  const artist = getArtistBySlug(main.artistSlug);
  const titleWords = main.title.split(" ");

  return (
    <div
      className={cn(
        "relative mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-y-10 px-6 py-16 md:grid-cols-12 md:gap-x-6 md:px-12 md:py-28"
      )}
    >
      {/* Large featured image */}
      <div
        className={cn(
          "relative md:col-span-7",
          reverse ? "md:col-start-6" : "md:col-start-1"
        )}
      >
        <a
          href={`/collection/${main.slug}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(main, mainRef.current);
          }}
          className="group block"
          {...viewCursor}
        >
          <div ref={mainParallax} className="overflow-hidden">
            <div
              ref={mainRef}
              className="relative aspect-[4/5] w-full overflow-hidden bg-umber md:aspect-[3/4]"
            >
              <div className="absolute inset-0 transition-transform duration-[1300ms] ease-museo-out group-hover:scale-[1.05]">
                <ArtworkImage
                  src={main.image.src}
                  alt={main.image.alt}
                  accent={main.accent}
                  focal={main.image.focal}
                  title={main.title}
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-30" />
            </div>
          </div>
        </a>

        {/* Peek image bleeding toward the viewport edge */}
        {peek && (
          <a
            href={`/collection/${peek.slug}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(peek, peekRef.current);
            }}
            className={cn(
              "group absolute bottom-0 hidden w-[38%] translate-y-1/3 md:block",
              reverse ? "-left-10 lg:-left-20" : "-right-10 lg:-right-20"
            )}
            {...viewCursor}
          >
            <div ref={peekParallax} className="overflow-hidden">
              <div
                ref={peekRef}
                className="relative aspect-[4/5] w-full overflow-hidden bg-umber shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
              >
                <div className="absolute inset-0 transition-transform duration-[1300ms] ease-museo-out group-hover:scale-[1.06]">
                  <ArtworkImage
                    src={peek.image.src}
                    alt={peek.image.alt}
                    accent={peek.accent}
                    focal={peek.image.focal}
                    title={peek.title}
                    sizes="24vw"
                  />
                </div>
              </div>
              <p className="mt-3 font-sans text-[10px] uppercase tracking-widest2 text-ash">
                {peek.archiveNumber} — {peek.title}
              </p>
            </div>
          </a>
        )}
      </div>

      {/* Stacked editorial text */}
      <div
        className={cn(
          "flex flex-col justify-center md:col-span-4",
          reverse ? "md:col-start-1 md:items-start" : "md:col-start-9 md:items-start"
        )}
      >
        <RevealOnScroll y={20}>
          <span className="font-sans text-xs text-gilt">{index}</span>
        </RevealOnScroll>
        <RevealOnScroll y={20} delay={0.05}>
          <p className="mt-3 font-sans text-[10px] uppercase tracking-widest2 text-ash">
            {artist?.firstName} {artist?.surname}
          </p>
        </RevealOnScroll>
        <div className="mt-3 leading-[0.9]">
          {titleWords.map((word, i) => (
            <RevealOnScroll key={i} y={30} delay={0.08 + i * 0.05}>
              <div className="overflow-hidden">
                <h3 className="font-display text-4xl uppercase tracking-tightest text-parchment md:text-6xl">
                  {word}
                </h3>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll y={20} delay={0.2}>
          <div className="mt-6 flex flex-col gap-1 font-sans text-[10px] uppercase tracking-widest2 text-ash">
            <span>{main.year}</span>
            <span>{main.medium}</span>
            <span>
              {main.location}, {main.city}
            </span>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
