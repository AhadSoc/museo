"use client";

import RevealText from "./RevealText";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  meta?: string;
}

export default function PageHeader({ eyebrow, title, description, meta }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-6 px-6 pb-16 pt-36 md:px-12 md:pb-24 md:pt-44">
      <div className="flex items-center gap-4">
        <span className="font-sans text-[10px] uppercase tracking-widest3 text-gilt">{eyebrow}</span>
        <span className="hairline w-16" />
        {meta && <span className="font-sans text-[10px] uppercase tracking-widest2 text-ash">{meta}</span>}
      </div>
      <RevealText
        text={title}
        as="h1"
        splitBy="words"
        className="font-display text-clamp-hero uppercase leading-[0.86] tracking-tightest text-parchment"
      />
      {description && (
        <p className="max-w-xl font-sans text-sm leading-relaxed text-ash md:text-base">{description}</p>
      )}
    </header>
  );
}
