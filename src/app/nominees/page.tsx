import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK = [
  { id: "1", category: "Best Brand Campaign", campaignTitle: "Sample – Shortlist announcement pending", organisation: "To be announced", status: "Awaiting jury review" },
  { id: "2", category: "Best Creative Idea", campaignTitle: "Sample – Shortlist announcement pending", organisation: "To be announced", status: "Awaiting jury review" },
  { id: "3", category: "Best Digital Campaign", campaignTitle: "Sample – Shortlist announcement pending", organisation: "To be announced", status: "Awaiting jury review" },
];

export default async function NomineesPage() {
  let items: any[] = [];
  try {
    const nominees = await prisma.nominee.findMany({
      where: { isPublished: true },
      include: { submission: { include: { category: true } } },
      orderBy: { createdAt: "desc" },
    });
    items = nominees.map((n) => ({
      id: n.id,
      category: n.submission.category.name,
      campaignTitle: n.submission.campaignTitle,
      organisation: n.submission.organisation,
      status: n.isWinner ? "Winner" : n.isFinalist ? "Finalist" : "Shortlisted",
      specialRecognition: n.specialRecognition,
    }));
  } catch {
    // no DB
  }

  const showFallback = items.length === 0;

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="text-4xl font-bold mb-4 text-center">Nominees & Finalists</h1>
        <p className="text-charcoal-400 text-center mb-12 max-w-2xl mx-auto">
          {showFallback
            ? "Shortlisted campaigns and winners will appear here after official announcement. Unpublished results remain private."
            : "Officially published shortlists, finalists and winners of The AdSphere Awards."}
        </p>

        {showFallback ? (
          <div className="space-y-4">
            {FALLBACK.map((item) => (
              <div key={item.id} className="border border-charcoal-700 border-dashed p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gold-400 uppercase tracking-wider">{item.category}</p>
                  <h2 className="text-lg font-semibold text-charcoal-300 mt-1">{item.campaignTitle}</h2>
                  <p className="text-sm text-charcoal-500">{item.organisation}</p>
                </div>
                <span className="text-xs text-charcoal-500 border border-charcoal-600 px-3 py-1 rounded self-start">{item.status}</span>
              </div>
            ))}
            <p className="text-center text-sm text-charcoal-500 mt-8">
              Results will be published by the organising team after jury evaluation.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border border-charcoal-700 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gold-500/40 transition">
                <div>
                  <p className="text-xs text-gold-400 uppercase tracking-wider">{item.category}</p>
                  <h2 className="text-lg font-semibold text-white mt-1">{item.campaignTitle}</h2>
                  <p className="text-sm text-charcoal-400">{item.organisation}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded self-start border ${item.status === "Winner" ? "border-gold-500 text-gold-400" : "border-charcoal-600 text-charcoal-300"}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
