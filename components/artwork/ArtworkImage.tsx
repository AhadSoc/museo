"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ArtworkImageProps {
  src: string;
  alt: string;
  accent: string;
  focal?: string;
  title?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

/**
 * Wraps next/image with a stylised fallback plate. If a Wikimedia Commons
 * link ever goes stale, the layout never breaks — a textured plate in the
 * painting's own accent tone stands in for the missing scan.
 */
export default function ArtworkImage({
  src,
  alt,
  accent,
  focal = "50% 50%",
  title,
  className,
  sizes = "100vw",
  priority = false,
  fill = true,
}: ArtworkImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn("relative flex items-center justify-center overflow-hidden", className)}
        style={{
          background: `radial-gradient(circle at 30% 20%, ${accent}55, #0A0806 75%)`,
        }}
      >
        <div className="paper-texture absolute inset-0" />
        <div className="absolute inset-0 border border-parchment/10" />
        <span className="relative px-6 text-center font-display text-lg uppercase tracking-widest text-parchment/50">
          {title ?? alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={className}
      style={{ objectFit: "cover", objectPosition: focal }}
    />
  );
}
