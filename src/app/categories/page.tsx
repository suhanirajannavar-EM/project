import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  let categories: any[] = [];
  try {
    categories = await prisma.awardCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    categories = [
      { id: "1", name: "Best Brand Campaign", description: "Outstanding brand campaigns that delivered measurable impact.", slug: "best-brand-campaign" },
      { id: "2", name: "Best Creative Idea", description: "Most original and inventive creative concepts.", slug: "best-creative-idea" },
      { id: "3", name: "Best Digital Campaign", description: "Excellence in digital advertising and interactive experiences.", slug: "best-digital-campaign" },
      { id: "4", name: "Best Film / TV Commercial", description: "Outstanding television, cinema or online film advertising.", slug: "best-film-tv-commercial" },
      { id: "5", name: "Best Integrated Campaign", description: "Campaigns that seamlessly integrate across multiple channels.", slug: "best-integrated-campaign" },
      { id: "6", name: "Young Creative of the Year", description: "Recognising exceptional talent under 30.", slug: "young-creative-of-the-year" },
    ];
  }

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Award Categories
        </h1>
        <p className="text-charcoal-400 text-center mb-12 max-w-2xl mx-auto">
          Categories are managed through the administration dashboard. Submission
          guidelines and eligibility may vary by category.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="border border-charcoal-700 p-6 hover:border-gold-500/40 transition"
            >
              <h2 className="text-xl font-semibold text-gold-400 mb-2">
                {cat.name}
              </h2>
              <p className="text-charcoal-300 text-sm mb-4">
                {cat.description || "Details will be published by the organising team."}
              </p>
              {cat.eligibility && (
                <p className="text-xs text-charcoal-500 mb-2">
                  Eligibility: {cat.eligibility}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/submit"
            className="inline-block px-8 py-4 bg-gold-500 text-charcoal-950 font-semibold rounded-sm hover:bg-gold-400 transition"
          >
            Submit Your Entry
          </Link>
        </div>
      </div>
    </div>
  );
}
