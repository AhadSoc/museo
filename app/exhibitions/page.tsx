import type { Metadata } from "next";
import { exhibitions } from "@/data/exhibitions";
import ExhibitionSection from "@/components/exhibitions/ExhibitionSection";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Current Exhibitions — Museo",
  description: "Five curated rooms, open now inside the archive.",
};

export default function ExhibitionsPage() {
  return (
    <main className="relative bg-void">
      <div className="pointer-events-none absolute left-6 top-28 z-10 flex items-center gap-4 md:left-12 md:top-32">
        <span className="font-sans text-[10px] uppercase tracking-widest3 text-gilt">Archive 03</span>
        <span className="hairline w-16" />
        <span className="font-sans text-[10px] uppercase tracking-widest2 text-ash">
          Current Exhibitions
        </span>
      </div>

      <div className="flex flex-col">
        {exhibitions.map((ex) => (
          <ExhibitionSection key={ex.id} exhibition={ex} />
        ))}
      </div>

      <Footer />
    </main>
  );
}
