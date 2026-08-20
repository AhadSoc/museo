"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { rooms, type Room } from "@/data/rooms";
import { artworks } from "@/data/artworks";
import { useCursorHover } from "@/hooks/useCursorHover";
import ArtworkCard from "@/components/artwork/ArtworkCard";

export default function MuseumMap() {
  const [selected, setSelected] = useState<Room | null>(null);
  const svgWrapRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const openCursor = useCursorHover("open");
  const closeCursor = useCursorHover("close");

  const selectRoom = (room: Room) => {
    setSelected(room);
    const cx = room.box.x + room.box.w / 2;
    const cy = room.box.y + room.box.h / 2;
    if (svgWrapRef.current) {
      gsap.to(svgWrapRef.current, {
        scale: 1.6,
        transformOrigin: `${cx}% ${cy}%`,
        duration: 0.9,
        ease: "power3.inOut",
      });
    }
    requestAnimationFrame(() => {
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: "power3.out" }
        );
      }
    });
  };

  const closeRoom = () => {
    if (svgWrapRef.current) {
      gsap.to(svgWrapRef.current, {
        scale: 1,
        transformOrigin: "50% 50%",
        duration: 0.7,
        ease: "power3.inOut",
      });
    }
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => setSelected(null),
      });
    } else {
      setSelected(null);
    }
  };

  const roomWorks = selected
    ? selected.artworkSlugs
        .map((slug) => artworks.find((a) => a.slug === slug))
        .filter((a): a is NonNullable<typeof a> => Boolean(a))
    : [];

  return (
    <div className="relative">
      <div className="relative mx-auto aspect-[4/3] w-full max-w-4xl overflow-hidden border border-parchment/15 bg-ink">
        <div ref={svgWrapRef} className="h-full w-full">
          <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
            {/* Corridor cross */}
            <line x1="50" y1="4" x2="50" y2="96" stroke="rgba(233,223,206,0.08)" strokeWidth="0.4" />
            <line x1="4" y1="50" x2="96" y2="50" stroke="rgba(233,223,206,0.08)" strokeWidth="0.4" />

            {rooms.map((room) => {
              const isSelected = selected?.slug === room.slug;
              const isDimmed = selected && !isSelected;
              return (
                <g
                  key={room.slug}
                  onClick={() => selectRoom(room)}
                  className="cursor-none"
                  style={{ opacity: isDimmed ? 0.15 : 1, transition: "opacity 0.5s ease" }}
                  {...openCursor}
                >
                  <rect
                    x={room.box.x}
                    y={room.box.y}
                    width={room.box.w}
                    height={room.box.h}
                    rx={1}
                    fill={isSelected ? "rgba(168,137,84,0.12)" : "rgba(233,223,206,0.03)"}
                    stroke={isSelected ? "#A88954" : "rgba(233,223,206,0.25)"}
                    strokeWidth="0.35"
                    className="transition-all duration-500"
                  />
                  <text
                    x={room.box.x + 4}
                    y={room.box.y + 8}
                    fill="#A88954"
                    fontSize="2.4"
                    fontFamily="var(--font-sans)"
                    letterSpacing="0.15em"
                  >
                    {room.number}
                  </text>
                  <text
                    x={room.box.x + 4}
                    y={room.box.y + room.box.h - 5}
                    fill="#E9DFCE"
                    fontSize="3.4"
                    fontFamily="var(--font-editorial)"
                    letterSpacing="0.05em"
                  >
                    {room.name}
                  </text>
                  <text
                    x={room.box.x + 4}
                    y={room.box.y + room.box.h - 2}
                    fill="#9C9181"
                    fontSize="1.8"
                    fontFamily="var(--font-sans)"
                  >
                    {room.artworkSlugs.length} WORKS
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-md text-center font-sans text-[10px] uppercase tracking-widest2 text-ash">
        Select a room to view its collection
      </p>

      {selected && (
        <div ref={panelRef} className="mt-16 opacity-0">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest2 text-gilt">
                {selected.number}
              </span>
              <h3 className="mt-1 font-display text-3xl uppercase tracking-tightest text-parchment md:text-5xl">
                {selected.name}
              </h3>
              <p className="mt-3 max-w-lg font-sans text-xs leading-relaxed text-ash md:text-sm">
                {selected.description}
              </p>
            </div>
            <button
              onClick={closeRoom}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-parchment/25 text-parchment transition-colors hover:border-gilt hover:text-gilt"
              aria-label="Close room"
              {...closeCursor}
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {roomWorks.map((w) => (
              <ArtworkCard key={w.id} artwork={w} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
