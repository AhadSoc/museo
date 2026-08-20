"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useAppReady } from "@/components/providers/AppReadyContext";
import { getArtworkBySlug } from "@/data/artworks";
import ArtworkImage from "@/components/artwork/ArtworkImage";

const artwork = getArtworkBySlug("the-calling-of-saint-matthew")!;

export default function Loader() {
  const { markReady } = useAppReady();
  const [shouldRender, setShouldRender] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const alreadyVisited =
      typeof window !== "undefined" && sessionStorage.getItem("museo-entered") === "1";
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadyVisited || prefersReducedMotion) {
      sessionStorage.setItem("museo-entered", "1");
      setShouldRender(false);
      markReady();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          sessionStorage.setItem("museo-entered", "1");
          markReady();
          setShouldRender(false);
        },
      });

      // Counter ticking 00 -> 100 across the whole sequence.
      const counterObj = { value: 0 };
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 3.4,
          ease: "power1.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.floor(counterObj.value)).padStart(2, "0");
            }
          },
        },
        0
      );

      // 1. Mark + eyebrow.
      tl.fromTo(
        markRef.current,
        { opacity: 0, letterSpacing: "0.05em" },
        { opacity: 1, letterSpacing: "0.5em", duration: 1.1 },
        0.15
      );
      tl.to(markRef.current, { opacity: 0, duration: 0.5 }, 1.5);

      // 2. Wordmark "MUSEO / ARCHIVE 01".
      tl.fromTo(
        wordmarkRef.current,
        { opacity: 0, yPercent: 30 },
        { opacity: 1, yPercent: 0, duration: 0.8 },
        1.5
      );
      tl.to(wordmarkRef.current, { opacity: 0, yPercent: -20, duration: 0.5 }, 2.35);

      // 3. Large stacked headline reveal.
      const lines = linesRef.current?.querySelectorAll<HTMLElement>("[data-line]") ?? [];
      tl.set(lines, { yPercent: 110 }, 2.3);
      tl.to(lines, { yPercent: 0, duration: 1, stagger: 0.09, ease: "power4.out" }, 2.5);

      // 4. Artwork emerges from darkness behind the headline.
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.15 },
        { opacity: 0.55, scale: 1, duration: 1.6, ease: "power2.out" },
        3.0
      );

      // 5. Headline recedes, curtain lifts to reveal the homepage hero beneath.
      tl.to(lines, { yPercent: -110, duration: 0.8, stagger: 0.05, ease: "power3.in" }, 4.35);
      tl.to(imageRef.current, { opacity: 0, duration: 0.6 }, 4.35);
      tl.to(curtainRef.current, { yPercent: -100, duration: 1, ease: "power4.inOut" }, 4.65);
    }, rootRef);

    return () => ctx.revert();
  }, [markReady]);

  if (!shouldRender) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9998]">
      <div ref={curtainRef} className="relative h-full w-full overflow-hidden bg-void">
        {/* Emerging artwork */}
        <div ref={imageRef} className="absolute inset-0 opacity-0">
          <ArtworkImage
            src={artwork.image.src}
            alt={artwork.image.alt}
            accent={artwork.accent}
            focal={artwork.image.focal}
            title={artwork.title}
            className="grayscale-[15%]"
          />
          <div className="absolute inset-0 bg-void/60" />
        </div>

        <div className="relative flex h-full w-full flex-col items-center justify-center px-6">
          {/* Mark */}
          <div
            ref={markRef}
            className="absolute font-sans text-[11px] uppercase tracking-widest3 text-gilt opacity-0"
          >
            The Renaissance Archive
          </div>

          {/* Wordmark */}
          <div ref={wordmarkRef} className="absolute flex flex-col items-center gap-3 opacity-0">
            <span className="font-editorial text-2xl uppercase tracking-[0.3em] text-parchment md:text-3xl">
              Museo
            </span>
            <span className="font-sans text-[11px] uppercase tracking-widest2 text-ash">
              Archive / 01
            </span>
          </div>

          {/* Stacked headline */}
          <div ref={linesRef} className="flex flex-col items-center text-center leading-[0.88]">
            {["THE", "RENAISSANCE", "ARCHIVE"].map((line) => (
              <div key={line} className="overflow-hidden">
                <div
                  data-line
                  className="font-display text-[13vw] uppercase tracking-tightest text-parchment md:text-[9vw]"
                >
                  {line}
                </div>
              </div>
            ))}
          </div>

          {/* Progress counter */}
          <div className="absolute bottom-10 flex items-center gap-3 font-sans text-[11px] tracking-widest2 text-ash">
            <span ref={counterRef}>00</span>
            <span className="hairline w-16" />
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
