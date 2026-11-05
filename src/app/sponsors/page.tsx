import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK = [
  { id: "1", name: "CreativeForge Studio", tier: "GOLD", description: "Leading creative production partner supporting excellence in brand storytelling.", website: "#" },
  { id: "2", name: "BrandVista Media", tier: "SILVER", description: "Media and strategy partner for the advertising industry.", website: "#" },
  { id: "3", name: "IdeaLab India", tier: "BRONZE", description: "Innovation lab backing emerging creative talent.", website: "#" },
  { id: "4", name: "Pixel & Type", tier: "PARTNER", description: "Design and typography studio.", website: "#" },
];

const tierStyle: Record<string, string> = {
  TITLE: "text-gold-300 border-gold-400",
  PLATINUM: "text-charcoal-200 border-charcoal-400",
  GOLD: "text-gold-400 border-gold-500",
  SILVER: "text-charcoal-300 border-charcoal-500",
  BRONZE: "text-amber-600 border-amber-700",
  PARTNER: "text-charcoal-400 border-charcoal-600",
  MEDIA: "text-charcoal-400 border-charcoal-600",
};

export default async function SponsorsPage() {
  let sponsors = FALLBACK;
  try {
    const db = await prisma.sponsor.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
    if (db.length > 0) sponsors = db as any;
  } catch {
    // fallback
  }

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="text-4xl font-bold mb-4 text-center">Sponsors & Partners</h1>
        <p className="text-charcoal-400 text-center mb-12 max-w-2xl mx-auto">
          We thank our sponsors and partners who support The AdSphere Awards.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsors.map((s) => (
            <div key={s.id} className="border border-charcoal-700 p-6 text-center hover:border-gold-500/40 transition flex flex-col">
              <div className="h-20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white tracking-tight">{s.name.split(" ")[0]}</span>
              </div>
              <span className={`text-xs uppercase tracking-widest border px-2 py-0.5 rounded self-center ${tierStyle[s.tier] || tierStyle.PARTNER}`}>
                {s.tier}
              </span>
              <h2 className="text-lg font-semibold mt-3 text-white">{s.name}</h2>
              {s.description && <p className="text-charcoal-400 text-sm mt-2 flex-1">{s.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
