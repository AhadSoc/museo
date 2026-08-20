"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  start?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function RevealOnScroll({
  children,
  className,
  y = 40,
  delay = 0,
  start = "top 85%",
  as = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as any;

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [y, delay, start]);

  return (
    <Tag ref={ref} className={cn(className)} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
