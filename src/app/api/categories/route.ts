import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FALLBACK_CATEGORIES = [
  { id: "cat-best-brand-campaign", name: "Best Brand Campaign", slug: "best-brand-campaign", description: "Outstanding brand campaigns that delivered measurable impact." },
  { id: "cat-best-creative-idea", name: "Best Creative Idea", slug: "best-creative-idea", description: "Most original and inventive creative concepts." },
  { id: "cat-best-digital-campaign", name: "Best Digital Campaign", slug: "best-digital-campaign", description: "Excellence in digital advertising and interactive experiences." },
  { id: "cat-best-film-tv", name: "Best Film / TV Commercial", slug: "best-film-tv-commercial", description: "Outstanding television, cinema or online film advertising." },
  { id: "cat-best-integrated", name: "Best Integrated Campaign", slug: "best-integrated-campaign", description: "Campaigns that seamlessly integrate across multiple channels." },
  { id: "cat-young-creative", name: "Young Creative of the Year", slug: "young-creative-of-the-year", description: "Recognising exceptional talent under 30." },
  { id: "cat-best-print", name: "Best Print / Outdoor", slug: "best-print-outdoor", description: "Excellence in print, outdoor and ambient advertising." },
  { id: "cat-best-social", name: "Best Social Media Campaign", slug: "best-social-media-campaign", description: "Outstanding social-first campaigns and community engagement." },
];

export async function GET() {
  try {
    const categories = await prisma.awardCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, slug: true, description: true },
    });
    if (categories.length > 0) {
      return NextResponse.json({ categories });
    }
    return NextResponse.json({ categories: FALLBACK_CATEGORIES, source: "fallback" });
  } catch {
    return NextResponse.json({ categories: FALLBACK_CATEGORIES, source: "fallback" });
  }
}
