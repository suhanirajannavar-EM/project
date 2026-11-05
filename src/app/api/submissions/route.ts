import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSubmissionId } from "@/lib/utils";
import { sendEmail, replaceVariables } from "@/lib/email";
import { ApplicantType } from "@prisma/client";

const FALLBACK_SLUG_MAP: Record<string, string> = {
  "cat-best-brand-campaign": "best-brand-campaign",
  "cat-best-creative-idea": "best-creative-idea",
  "cat-best-digital-campaign": "best-digital-campaign",
  "cat-best-film-tv": "best-film-tv-commercial",
  "cat-best-integrated": "best-integrated-campaign",
  "cat-young-creative": "young-creative-of-the-year",
  "cat-best-print": "best-print-outdoor",
  "cat-best-social": "best-social-media-campaign",
};

async function resolveCategoryId(categoryId: string): Promise<string | null> {
  const byId = await prisma.awardCategory.findUnique({ where: { id: categoryId } });
  if (byId) return byId.id;

  const slug = FALLBACK_SLUG_MAP[categoryId] || categoryId;
  const bySlug = await prisma.awardCategory.findUnique({ where: { slug } });
  if (bySlug) return bySlug.id;

  const names: Record<string, string> = {
    "best-brand-campaign": "Best Brand Campaign",
    "best-creative-idea": "Best Creative Idea",
    "best-digital-campaign": "Best Digital Campaign",
    "best-film-tv-commercial": "Best Film / TV Commercial",
    "best-integrated-campaign": "Best Integrated Campaign",
    "young-creative-of-the-year": "Young Creative of the Year",
    "best-print-outdoor": "Best Print / Outdoor",
    "best-social-media-campaign": "Best Social Media Campaign",
  };
  if (names[slug]) {
    const created = await prisma.awardCategory.create({
      data: {
        name: names[slug],
        slug,
        isActive: true,
        description: "Award category for The AdSphere Awards.",
      },
    });
    return created.id;
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.applicantName || !body.email || !body.campaignTitle || !body.categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
      await prisma.$queryRaw`SELECT 1 FROM "AwardCategory" LIMIT 1`;
    } catch {
      return NextResponse.json(
        {
          error:
            "Database tables are not set up yet. Please run: npx prisma db push && npm run db:seed",
        },
        { status: 503 }
      );
    }

    const existing = await prisma.awardSubmission.findFirst({
      where: {
        email: body.email.toLowerCase(),
        campaignTitle: body.campaignTitle,
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A similar submission was already received recently. Please check your email." },
        { status: 409 }
      );
    }

    const resolvedCategoryId = await resolveCategoryId(body.categoryId);
    if (!resolvedCategoryId) {
      return NextResponse.json({ error: "Invalid award category selected." }, { status: 400 });
    }

    const submissionId = generateSubmissionId();

    const submission = await prisma.awardSubmission.create({
      data: {
        submissionId,
        applicantName: body.applicantName,
        email: body.email.toLowerCase(),
        mobile: body.mobile,
        organisation: body.organisation,
        designation: body.designation || null,
        city: body.city,
        country: body.country || "India",
        applicantType: (body.applicantType as ApplicantType) || "INDIVIDUAL",
        campaignTitle: body.campaignTitle,
        campaignDescription: body.campaignDescription,
        categoryId: resolvedCategoryId,
        launchDate: body.launchDate ? new Date(body.launchDate) : null,
        objectives: body.objectives || null,
        targetAudience: body.targetAudience || null,
        creativeStrategy: body.creativeStrategy || null,
        resultsImpact: body.resultsImpact || null,
        portfolioLink: body.portfolioLink || null,
        hasPermission: !!body.hasPermission,
        acceptedTerms: !!body.acceptedTerms,
        status: "SUBMITTED",
      },
      include: { category: true },
    });

    await prisma.submissionStatusHistory.create({
      data: {
        submissionId: submission.id,
        toStatus: "SUBMITTED",
        notes: "Initial submission",
      },
    });

    try {
      const template = await prisma.emailTemplate.findUnique({
        where: { name: "submission_confirmation" },
      });
      if (template) {
        const html = replaceVariables(template.bodyHtml, {
          participant_name: submission.applicantName,
          submission_id: submission.submissionId,
          award_category: submission.category.name,
          event_name: "The AdSphere Awards",
        });
        await sendEmail({
          to: submission.email,
          subject: template.subject,
          html,
          templateName: "submission_confirmation",
        });
      }
    } catch {
      // email optional
    }

    return NextResponse.json({
      success: true,
      submissionId: submission.submissionId,
      message: "Submission received",
    });
  } catch (error: any) {
    console.error("Submission error:", error);
    const msg = error.message || "Failed to create submission";
    if (msg.includes("does not exist") || msg.includes("P2021")) {
      return NextResponse.json(
        {
          error:
            "Database tables are not set up. Please run: npx prisma db push && npm run db:seed",
        },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
