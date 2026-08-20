import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { exhibitions, getExhibitionBySlug } from "@/data/exhibitions";
import { artworks, getArtworkBySlug } from "@/data/artworks";
import ExhibitionProfile from "@/components/exhibitions/ExhibitionProfile";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return exhibitions.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const exhibition = getExhibitionBySlug(params.slug);
  if (!exhibition) return {};
  return {
    title: `${exhibition.title} — Museo`,
    description: exhibition.description,
  };
}

export default function ExhibitionPage({ params }: PageProps) {
  const exhibition = getExhibitionBySlug(params.slug);
  if (!exhibition) notFound();

  const cover = getArtworkBySlug(exhibition.coverArtworkSlug);
  if (!cover) notFound();

  const works = exhibition.artworkSlugs
    .map((slug) => artworks.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return <ExhibitionProfile exhibition={exhibition} cover={cover} works={works} />;
}
