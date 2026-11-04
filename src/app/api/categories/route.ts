import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.awardCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, slug: true, description: true },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json(
      { categories: [], error: "Database not available" },
      { status: 200 }
    );
  }
}
