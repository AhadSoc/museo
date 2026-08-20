import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artworks, getArtworkBySlug } from "@/data/artworks";
import ArtworkDetail from "@/components/artwork/ArtworkDetail";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const artwork = getArtworkBySlug(params.slug);
  if (!artwork) return {};
  return {
    title: `${artwork.title} — Museo`,
    description: artwork.description,
  };
}

export default function ArtworkPage({ params }: PageProps) {
  const artwork = getArtworkBySlug(params.slug);
  if (!artwork) notFound();

  const currentIndex = artworks.findIndex((a) => a.slug === artwork.slug);
  const next = artworks[(currentIndex + 1) % artworks.length];

  return <ArtworkDetail artwork={artwork} next={next} />;
}
