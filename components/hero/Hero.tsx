"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { useAppReady } from "@/components/providers/AppReadyContext";
import { useMousePositionRef } from "@/hooks/useMousePosition";
import { getArtworkBySlug } from "@/data/artworks";
import ArtworkImage from "@/components/artwork/ArtworkImage";
import RevealText from "@/components/ui/RevealText";
import TransitionLink from "@/components/transitions/TransitionLink";

const artwork = getArtworkBySlug("creation-of-adam")!;

const EDGE_NAV = [
  { number: "01", label: "COLLECTION", href: "/collection" },
  { number: "02", label: "ARTISTS", href: "/artists" },
  { number: "03", label: "EXHIBITIONS", href: "/exhibitions" },
  { number: "04", label: "ARCHIVE", href: "/map" },
  { number: "05", label: "ABOUT", href: "/about" },
];

export default function Hero() {
  const { isReady } = useAppReady();
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const imageInnerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);
  const mouse = useMousePositionRef();

  // Entrance: image emerges + settles once the loader hands off.
  useEffect(() => {
    if (!isReady) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(imageInnerRef.current, { scale: 1.22, opacity: 0.3 }, { scale: 1.06, opacity: 1, duration: 2.2 }, 0)
      .fromTo(metaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 }, 0.6)
      .fromTo(navRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 }, 0.8)
      .fromTo(scrollCueRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2);
  }, [isReady]);

  // Continuous subtle mouse parallax.
  useEffect(() => {
    if (!isReady) return;
    let raf: number;
    const loop = () => {
      const { nx, ny } = mouse.current;
      if (imageInnerRef.current) {
        gsap.to(imageInnerRef.current, {
          x: nx * 18,
          y: ny * 12,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          x: nx * -10,
          y: ny * -6,
          duration: 1.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isReady, mouse]);

  // Scroll-pin: image scales up and content recedes as the viewer scrolls past.
  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
        },
      });

      tl.to(imageWrapRef.current, { scale: 1.18, duration: 1, ease: "none" }, 0)
        .to(imageWrapRef.current, { opacity: 0.25, duration: 0.4, ease: "none" }, 0.6)
        .to(headlineRef.current, { yPercent: -60, opacity: 0, duration: 1, ease: "none" }, 0)
        .to([metaRef.current, navRef.current, scrollCueRef.current], { opacity: 0, y: -20, duration: 0.5, ease: "none" }, 0.1);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden bg-void">
      <div ref={imageWrapRef} className="absolute inset-0">
        <div ref={imageInnerRef} className="absolute inset-0 will-change-transform">
          <ArtworkImage
            src={artwork.image.src}
            alt={artwork.image.alt}
            accent={artwork.accent}
            focal={artwork.image.focal}
            title={artwork.title}
            priority
            className="grayscale-[10%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/20 to-void" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
      </div>

      <div className="relative flex h-full w-full flex-col justify-between px-6 pb-8 pt-28 md:px-12 md:pb-12 md:pt-32">
        <div ref={headlineRef} className="flex flex-col items-start will-change-transform">
          <span className="mb-4 font-sans text-[11px] uppercase tracking-widest3 text-gilt md:mb-6">
            Museo
          </span>
          <RevealText
            text="THE RENAISSANCE"
            as="h1"
            splitBy="words"
            trigger="manual"
            play={isReady}
            delay={0.35}
            className="font-display text-clamp-hero uppercase leading-[0.86] tracking-tightest text-parchment"
          />
          <RevealText
            text="ARCHIVE"
            as="h1"
            splitBy="words"
            trigger="manual"
            play={isReady}
            delay={0.55}
            className="font-display text-clamp-hero uppercase leading-[0.86] tracking-tightest text-outline"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div
            ref={metaRef}
            className="flex flex-col gap-4 font-sans text-[10px] uppercase tracking-widest2 text-ash opacity-0 md:flex-row md:items-center md:justify-between"
          >
            <span>Roma · 1508—1512</span>
            <span className="hidden h-px w-16 bg-parchment/20 md:block" />
            <span>Archive 01 — Digital Collection</span>
            <span className="hidden h-px w-16 bg-parchment/20 md:block" />
            <span>A museum reconstructed at night</span>
          </div>

          <div ref={navRef} className="opacity-0">
            <div className="hairline-full mb-4 hidden md:block" />
            <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-between">
              {EDGE_NAV.map((item) => (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  cursor="open"
                  className="group flex items-baseline gap-2 font-sans text-[11px] uppercase tracking-widest2 text-parchment/80 transition-colors duration-300 hover:text-gilt"
                >
                  <span className="text-gilt/70 group-hover:text-gilt">{item.number}</span>
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gilt transition-all duration-300 group-hover:w-full" />
                  </span>
                </TransitionLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollCueRef}
        className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0 md:bottom-10"
      >
        <span className="font-sans text-[9px] uppercase tracking-widest2 text-ash">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-parchment/15">
          <span className="block h-full w-full origin-top animate-[scrollcue_2.2s_ease-in-out_infinite] bg-gilt" />
        </span>
      </div>

      <style jsx>{`
        @keyframes scrollcue {
          0% {
            transform: scaleY(0);
            transform-origin: top;
          }
          50% {
            transform: scaleY(1);
            transform-origin: top;
          }
          50.1% {
            transform-origin: bottom;
          }
          100% {
            transform: scaleY(0);
            transform-origin: bottom;
          }
        }
      `}</style>
    </section>
  );
}
