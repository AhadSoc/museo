import type { Metadata } from "next";
import { artworks } from "@/data/artworks";
import PageHeader from "@/components/ui/PageHeader";
import EditorialRow from "@/components/artwork/EditorialRow";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "The Collection — Museo",
  description: "Twenty works from the Renaissance archive, held in permanent digital light.",
};

export default function CollectionPage() {
  const rows: { main: (typeof artworks)[number]; peek?: (typeof artworks)[number] }[] = [];
  for (let i = 0; i < artworks.length; i += 2) {
    rows.push({ main: artworks[i], peek: artworks[i + 1] });
  }

  return (
    <main className="relative bg-void">
      <PageHeader
        eyebrow="Archive 01"
        title="THE COLLECTION"
        description="Twenty works, drawn from Florence, Rome, Venice, and Milan — reconstructed here at full scale, in the dark."
        meta={`${artworks.length} WORKS`}
      />

      <div className="flex flex-col">
        {rows.map((row, i) => (
          <div key={row.main.id} className={i % 2 === 1 ? "md:bg-ink/40" : ""}>
            <EditorialRow
              index={String(i + 1).padStart(2, "0")}
              main={row.main}
              peek={row.peek}
              reverse={i % 2 === 1}
            />
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
