"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { pageTransitionStore, type TransitionPayload } from "@/lib/pageTransitionStore";

export default function PageTransitionLayer() {
  const [payload, setPayload] = useState<TransitionPayload | null>(null);
  const [phase, setPhase] = useState<"idle" | "covering" | "covered" | "revealing">("idle");
  const curtainTopRef = useRef<HTMLDivElement | null>(null);
  const curtainBottomRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const cloneRef = useRef<HTMLDivElement | null>(null);
  const cloneImgRef = useRef<HTMLImageElement | null>(null);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Subscribe to the imperative store.
  useEffect(() => {
    return pageTransitionStore.subscribe((p, ph) => {
      setPayload(p);
      setPhase(ph);
    });
  }, []);

  // Once route changes while we're mid-transition, reveal the new page.
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      if (pageTransitionStore.phase === "covered") {
        requestAnimationFrame(() => {
          setTimeout(() => pageTransitionStore.reveal(), 90);
        });
      }
    }
  }, [pathname]);

  // Drive the animations for each phase.
  useEffect(() => {
    if (!payload) return;

    if (payload.mode === "room") {
      const top = curtainTopRef.current;
      const bottom = curtainBottomRef.current;
      const label = labelRef.current;
      if (!top || !bottom) return;

      if (phase === "covering") {
        gsap.set([top, bottom], { display: "block" });
        const tl = gsap.timeline({
          onComplete: () => pageTransitionStore.markCovered(),
        });
        tl.fromTo(bottom, { yPercent: 100 }, { yPercent: 0, duration: 0.65, ease: "power4.inOut" }, 0)
          .fromTo(top, { yPercent: -100 }, { yPercent: 0, duration: 0.65, ease: "power4.inOut" }, 0)
          .fromTo(
            label,
            { yPercent: 30, opacity: 0, letterSpacing: "0.1em" },
            { yPercent: 0, opacity: 1, letterSpacing: "0.35em", duration: 0.5, ease: "power2.out" },
            0.2
          );
      }

      if (phase === "revealing") {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set([top, bottom], { display: "none" });
            pageTransitionStore.reset();
          },
        });
        tl.to(label, { opacity: 0, duration: 0.25, ease: "power2.in" })
          .to(top, { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, 0.1)
          .to(bottom, { yPercent: 100, duration: 0.75, ease: "power4.inOut" }, 0.1);
      }
    }

    if (payload.mode === "artwork") {
      const clone = cloneRef.current;
      const img = cloneImgRef.current;
      if (!clone || !img) return;

      if (phase === "covering") {
        const { rect } = payload;
        gsap.set(clone, {
          display: "block",
          position: "fixed",
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          overflow: "hidden",
          zIndex: 50,
        });
        gsap.set(img, { scale: 1.001 });

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        gsap.timeline({ onComplete: () => pageTransitionStore.markCovered() }).to(clone, {
          top: 0,
          left: 0,
          width: vw,
          height: vh,
          duration: 0.85,
          ease: "power3.inOut",
        });
      }

      if (phase === "revealing") {
        gsap.timeline({
          onComplete: () => {
            gsap.set(clone, { display: "none" });
            pageTransitionStore.reset();
          },
        }).to(clone, { opacity: 0, duration: 0.55, ease: "power2.out", delay: 0.05 });
      }
    }
  }, [phase, payload]);

  return (
    <div aria-hidden="true">
      {/* Room curtain transition */}
      <div
        ref={curtainTopRef}
        className="pointer-events-none fixed left-0 top-0 z-overlay hidden h-1/2 w-full bg-void"
      />
      <div
        ref={curtainBottomRef}
        className="pointer-events-none fixed bottom-0 left-0 z-overlay hidden h-1/2 w-full bg-void"
      >
        <div
          ref={labelRef}
          className="absolute -top-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-center opacity-0"
        >
          <span className="font-sans text-[10px] uppercase tracking-widest3 text-gilt">Museo</span>
          <span className="font-display text-3xl uppercase tracking-widest text-parchment md:text-5xl">
            {payload?.mode === "room" ? payload.label : ""}
          </span>
        </div>
      </div>

      {/* Artwork shared-element transition */}
      <div ref={cloneRef} className="pointer-events-none fixed hidden">
        {payload?.mode === "artwork" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={cloneImgRef}
            src={payload.src}
            alt={payload.alt}
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 40%" }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 55%, ${
              payload?.mode === "artwork" ? payload.accent : "#0A0806"
            }55 100%)`,
          }}
        />
      </div>
    </div>
  );
}
