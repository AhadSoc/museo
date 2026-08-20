"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import type { Artwork } from "@/data/artworks";
import { getArtistBySlug } from "@/data/artists";
import ArtworkImage from "./ArtworkImage";
import { pageTransitionStore } from "@/lib/pageTransitionStore";
import { useCursorHover } from "@/hooks/useCursorHover";
import { cn } from "@/lib/utils";

interface ArtworkCardProps {
  artwork: Artwork;
  className?: string;
  aspect?: string;
  showIndex?: boolean;
}

export default function ArtworkCard({
  artwork,
  className,
  aspect = "aspect-[4/5]",
  showIndex = true,
}: ArtworkCardProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewCursor = useCursorHover("view");
  const artist = getArtistBySlug(artwork.artistSlug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pageTransitionStore.phase !== "idle") return;
    const el = containerRef.current;
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

  return (
    <a
      href={`/collection/${artwork.slug}`}
      onClick={handleClick}
      className={cn("group block", className)}
      {...viewCursor}
    >
      <div ref={containerRef} className={cn("relative overflow-hidden bg-umber", aspect)}>
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-museo-out group-hover:scale-[1.06]">
          <ArtworkImage
            src={artwork.image.src}
            alt={artwork.image.alt}
            accent={artwork.accent}
            focal={artwork.image.focal}
            title={artwork.title}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
        {showIndex && (
          <span className="absolute left-4 top-4 font-sans text-[10px] uppercase tracking-widest2 text-parchment/70">
            {artwork.archiveNumber}
          </span>
        )}
        <span className="absolute bottom-4 right-4 h-8 w-8 -translate-y-1 rounded-full border border-parchment/0 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:border-parchment/50 group-hover:opacity-100" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4 transition-transform duration-500 ease-museo-out group-hover:translate-x-1">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-widest2 text-ash">
            {artist ? `${artist.firstName} ${artist.surname}` : ""}
          </p>
          <h3 className="mt-1 font-display text-2xl uppercase leading-tight text-parchment md:text-3xl">
            {artwork.title}
          </h3>
        </div>
        <span className="whitespace-nowrap pt-1 font-sans text-[10px] uppercase tracking-widest2 text-ash">
          {artwork.year}
        </span>
      </div>
    </a>
  );
}
