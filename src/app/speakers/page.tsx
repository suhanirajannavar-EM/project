import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK = [
  {
    id: "1",
    name: "Ananya Krishnan",
    designation: "Chief Creative Officer",
    organisation: "Horizon Advertising",
    biography: "Award-winning creative leader with two decades of experience building iconic Indian brands.",
    expertise: "Brand Strategy, Creative Direction",
    sessionRole: "Keynote – Day 1",
  },
  {
    id: "2",
    name: "Rohan Mehta",
    designation: "Founder & Creative Director",
    organisation: "Studio North",
    biography: "Founder of Studio North. Known for craft-led campaigns across film, digital and experiential.",
    expertise: "Film, Craft, Storytelling",
    sessionRole: "Jury – Film & Digital",
  },
  {
    id: "3",
    name: "Priya Nair",
    designation: "Head of Brand Marketing",
    organisation: "Aether Consumer Brands",
    biography: "Brand marketer who has led multi-market launches and purpose-led campaigns for leading FMCG brands.",
    expertise: "Brand Marketing, Purpose",
    sessionRole: "Panel – Brand Building",
  },
  {
    id: "4",
    name: "Vikram Shah",
    designation: "Independent Creative Consultant",
    organisation: "Formerly Leo Burnett",
    biography: "Independent consultant and mentor to young creatives. Multiple national award wins across print and integrated.",
    expertise: "Creative Mentorship, Print",
    sessionRole: "Jury – Print & Integrated",
  },
];

export default async function SpeakersPage() {
  let speakers = FALLBACK;
  try {
    const db = await prisma.speaker.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
    if (db.length > 0) speakers = db as any;
  } catch {
    // use fallback
  }

  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="text-4xl font-bold mb-4 text-center">Speakers & Jury</h1>
        <p className="text-charcoal-400 text-center mb-12 max-w-2xl mx-auto">
          Industry leaders, creative directors and jury members shaping The AdSphere Awards.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {speakers.map((sp) => (
            <div key={sp.id} className="border border-charcoal-700 p-6 hover:border-gold-500/40 transition">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-charcoal-800 border border-gold-500/30 flex items-center justify-center text-gold-400 text-xl font-bold shrink-0">
                  {sp.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{sp.name}</h2>
                  <p className="text-gold-400 text-sm">
                    {sp.designation}{sp.organisation ? ` · ${sp.organisation}` : ""}
                  </p>
                  {sp.sessionRole && (
                    <p className="text-xs text-charcoal-500 mt-1 uppercase tracking-wider">{sp.sessionRole}</p>
                  )}
                  <p className="text-charcoal-300 text-sm mt-3 leading-relaxed">{sp.biography}</p>
                  {sp.expertise && (
                    <p className="text-xs text-charcoal-500 mt-2">Expertise: {sp.expertise}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
