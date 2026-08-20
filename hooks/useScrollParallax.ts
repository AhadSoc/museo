"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

/**
 * Applies a continuous, scrub-linked vertical parallax to the returned ref's
 * element as it travels through the viewport. `speed` > 0 drifts the element
 * down relative to scroll, < 0 drifts it up — used to make paired images in
 * an editorial layout feel like they are moving independently.
 */
export function useScrollParallax<T extends HTMLElement>(speed = 10) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
