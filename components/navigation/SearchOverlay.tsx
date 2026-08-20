"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useUIState } from "@/components/providers/UIStateProvider";
import { pageTransitionStore } from "@/lib/pageTransitionStore";
import { artworks } from "@/data/artworks";
import { artists } from "@/data/artists";
import { useCursorHover } from "@/hooks/useCursorHover";
import ArtworkImage from "@/components/artwork/ArtworkImage";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUIState();
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const closeCursor = useCursorHover("close");
  const viewCursor = useCursorHover("view");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (searchOpen) {
      gsap.set(root, { display: "flex" });
      gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(
        root.querySelectorAll("[data-search-in]"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, delay: 0.15, ease: "power3.out" }
      );
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      gsap.to(root, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(root, { display: "none" });
          setQuery("");
        },
      });
    }
  }, [searchOpen]);

  const artworkResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return artworks
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.medium.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          artists.find((art) => art.slug === a.artistSlug)?.surname.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const artistResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return artists
      .filter(
        (a) =>
          a.firstName.toLowerCase().includes(q) ||
          a.surname.toLowerCase().includes(q) ||
          a.region.toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [query]);

  useEffect(() => {
    if (!resultsRef.current) return;
    gsap.fromTo(
      resultsRef.current.children,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" }
    );
  }, [artworkResults, artistResults]);

  const goTo = (href: string, label: string) => {
    setSearchOpen(false);
    pageTransitionStore.cover({ mode: "room", label });
    setTimeout(() => router.push(href), 550);
  };

  const hasQuery = query.trim().length > 0;
  const hasResults = artworkResults.length > 0 || artistResults.length > 0;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-overlay hidden flex-col overflow-y-auto bg-void/98 px-6 pb-16 pt-28 opacity-0 md:px-16 md:pt-36"
    >
      <button
        onClick={() => setSearchOpen(false)}
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-parchment/25 text-parchment transition-colors hover:border-gilt hover:text-gilt md:right-10 md:top-10"
        aria-label="Close search"
        {...closeCursor}
      >
        ×
      </button>

      <div data-search-in className="max-w-3xl">
        <span className="font-sans text-[10px] uppercase tracking-widest2 text-gilt">
          Search the Archive
        </span>
        <p className="mt-3 font-display text-2xl uppercase tracking-wide text-ash md:text-3xl">
          What are you looking for?
        </p>
      </div>

      <div data-search-in className="mt-8 max-w-3xl border-b border-parchment/25 pb-4">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="A name, a title, a city…"
          className="w-full bg-transparent font-editorial text-3xl text-parchment placeholder:text-ash/40 focus:outline-none md:text-5xl"
        />
      </div>

      {hasQuery && !hasResults && (
        <p data-search-in className="mt-10 font-sans text-sm text-ash">
          Nothing in the archive matches &ldquo;{query}&rdquo;.
        </p>
      )}

      {hasResults && (
        <div ref={resultsRef} className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
          {artworkResults.length > 0 && (
            <div className="md:col-span-2">
              <span className="font-sans text-[10px] uppercase tracking-widest2 text-ash">
                Artworks
              </span>
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {artworkResults.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => goTo(`/collection/${a.slug}`, a.title)}
                    className="group text-left"
                    {...viewCursor}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-umber">
                      <ArtworkImage
                        src={a.image.src}
                        alt={a.image.alt}
                        accent={a.accent}
                        focal={a.image.focal}
                        title={a.title}
                        className="transition-transform duration-700 ease-museo-out group-hover:scale-105"
                        sizes="33vw"
                      />
                    </div>
                    <p className="mt-3 font-display text-lg uppercase leading-tight text-parchment">
                      {a.title}
                    </p>
                    <p className="font-sans text-[10px] uppercase tracking-widest2 text-ash">
                      {artists.find((art) => art.slug === a.artistSlug)?.surname} · {a.year}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {artistResults.length > 0 && (
            <div className="md:col-span-2">
              <span className="font-sans text-[10px] uppercase tracking-widest2 text-ash">
                Artists
              </span>
              <div className="mt-4 flex flex-col divide-y divide-parchment/10">
                {artistResults.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => goTo(`/artists/${a.slug}`, a.surname)}
                    className="group flex items-baseline justify-between py-4 text-left"
                    {...viewCursor}
                  >
                    <span className="font-display text-2xl uppercase text-parchment transition-colors group-hover:text-gilt">
                      {a.firstName} {a.surname}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-widest2 text-ash">
                      {a.years}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
