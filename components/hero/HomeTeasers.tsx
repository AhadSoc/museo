"use client";

import { artworks } from "@/data/artworks";
import { exhibitions } from "@/data/exhibitions";
import { getArtworkBySlug } from "@/data/artworks";
import EditorialRow from "@/components/artwork/EditorialRow";
import ArtworkImage from "@/components/artwork/ArtworkImage";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TransitionLink from "@/components/transitions/TransitionLink";

const FEATURED = [
  { main: artworks.find((a) => a.slug === "mona-lisa")!, peek: artworks.find((a) => a.slug === "the-birth-of-venus")! },
  {
    main: artworks.find((a) => a.slug === "the-calling-of-saint-matthew")!,
    peek: artworks.find((a) => a.slug === "david")!,
  },
];

export default function HomeTeasers() {
  return (
    <>
      <section className="relative border-t border-parchment/10 pt-16 md:pt-24">
        <div className="px-6 md:px-12">
          <RevealOnScroll>
            <div className="flex items-center gap-4">
              <span className="font-sans text-[10px] uppercase tracking-widest3 text-gilt">
                Archive 01
              </span>
              <span className="hairline w-16" />
              <span className="font-sans text-[10px] uppercase tracking-widest2 text-ash">
                Selected Works
              </span>
            </div>
          </RevealOnScroll>
        </div>

        <div className="flex flex-col">
          {FEATURED.map((row, i) => (
            <EditorialRow
              key={row.main.id}
              index={String(i + 1).padStart(2, "0")}
              main={row.main}
              peek={row.peek}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        <div className="flex justify-center px-6 pb-20 pt-4 md:pb-28">
          <TransitionLink
            href="/collection"
            label="COLLECTION"
            cursor="open"
            className="group inline-flex items-center gap-3 border border-parchment/25 px-8 py-4 font-sans text-[11px] uppercase tracking-widest2 text-parchment transition-colors duration-300 hover:border-gilt hover:text-gilt"
          >
            View the Full Collection
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </TransitionLink>
        </div>
      </section>

      <section className="relative border-t border-parchment/10 px-6 py-16 md:px-12 md:py-24">
        <RevealOnScroll>
          <div className="mb-10 flex items-center gap-4">
            <span className="font-sans text-[10px] uppercase tracking-widest3 text-gilt">
              Archive 03
            </span>
            <span className="hairline w-16" />
            <span className="font-sans text-[10px] uppercase tracking-widest2 text-ash">
              Current Exhibitions
            </span>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {exhibitions.slice(0, 4).map((ex) => {
            const cover = getArtworkBySlug(ex.coverArtworkSlug);
            if (!cover) return null;
            return (
              <RevealOnScroll key={ex.id}>
                <TransitionLink
                  href={`/exhibitions/${ex.slug}`}
                  label={ex.title}
                  cursor="view"
                  className="group relative block aspect-[16/10] overflow-hidden bg-umber"
                >
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-museo-out group-hover:scale-105">
                    <ArtworkImage
                      src={cover.image.src}
                      alt={cover.image.alt}
                      accent={cover.accent}
                      focal={cover.image.focal}
                      title={cover.title}
                      sizes="50vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="font-sans text-[10px] uppercase tracking-widest2 text-gilt">
                      {ex.number}
                    </span>
                    <h3 className="mt-1 font-display text-3xl uppercase leading-none tracking-tightest text-parchment">
                      {ex.title}
                    </h3>
                  </div>
                </TransitionLink>
              </RevealOnScroll>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <TransitionLink
            href="/exhibitions"
            label="EXHIBITIONS"
            cursor="open"
            className="group inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-widest2 text-ash transition-colors duration-300 hover:text-gilt"
          >
            View All Exhibitions
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </TransitionLink>
        </div>
      </section>
    </>
  );
}
