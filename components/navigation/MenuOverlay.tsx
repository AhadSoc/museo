"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useUIState } from "@/components/providers/UIStateProvider";
import { pageTransitionStore } from "@/lib/pageTransitionStore";
import { useCursorHover } from "@/hooks/useCursorHover";

const ITEMS = [
  { number: "01", label: "COLLECTION", href: "/collection", meta: "THE FULL ARCHIVE" },
  { number: "02", label: "ARTISTS", href: "/artists", meta: "EIGHT MASTERS" },
  { number: "03", label: "EXHIBITIONS", href: "/exhibitions", meta: "FIVE CURRENT ROOMS" },
  { number: "04", label: "ARCHIVE", href: "/map", meta: "THE FLOOR PLAN" },
  { number: "05", label: "ABOUT", href: "/about", meta: "THE INSTITUTION" },
];

export default function MenuOverlay() {
  const { menuOpen, setMenuOpen } = useUIState();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const closeCursor = useCursorHover("close");
  const openCursor = useCursorHover("open");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (menuOpen) {
      gsap.set(root, { display: "flex" });
      gsap.fromTo(root, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" });
      const rows = root.querySelectorAll("[data-menu-row]");
      gsap.fromTo(
        rows,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.06, delay: 0.25, ease: "power4.out" }
      );
    } else {
      gsap.to(root, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => gsap.set(root, { display: "none" }),
      });
    }
  }, [menuOpen]);

  const handleNavigate = (href: string, label: string) => {
    setMenuOpen(false);
    if (pathname === href) return;
    pageTransitionStore.cover({ mode: "room", label });
    setTimeout(() => router.push(href), 550);
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-overlay hidden flex-col justify-center bg-void/98 px-6 py-24 md:px-16"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <div className="absolute right-6 top-6 md:right-10 md:top-10">
        <button
          onClick={() => setMenuOpen(false)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-parchment/25 text-parchment transition-colors hover:border-gilt hover:text-gilt"
          aria-label="Close menu"
          {...closeCursor}
        >
          ×
        </button>
      </div>

      <nav className="flex flex-col">
        {ITEMS.map((item) => (
          <div key={item.href} className="overflow-hidden border-b border-parchment/10">
            <button
              data-menu-row
              onClick={() => handleNavigate(item.href, item.label)}
              className="group flex w-full items-baseline justify-between py-5 text-left md:py-7"
              {...openCursor}
            >
              <span className="flex items-baseline gap-4 md:gap-8">
                <span className="font-sans text-xs text-gilt md:text-sm">{item.number}</span>
                <span className="font-display text-[12vw] uppercase leading-none tracking-tightest text-parchment transition-colors duration-300 group-hover:text-gilt md:text-[5.5vw]">
                  {item.label}
                </span>
              </span>
              <span className="hidden font-sans text-[10px] uppercase tracking-widest2 text-ash md:inline">
                {item.meta}
              </span>
            </button>
          </div>
        ))}
      </nav>

      <div className="mt-10 flex items-center justify-between font-sans text-[10px] uppercase tracking-widest2 text-ash">
        <span>Museo — The Renaissance Archive</span>
        <span>Est. MMXXIV</span>
      </div>
    </div>
  );
}
