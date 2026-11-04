import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSubmissionId } from "@/lib/utils";
import { sendEmail, replaceVariables } from "@/lib/email";
import { ApplicantType } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.applicantName || !body.email || !body.campaignTitle || !body.categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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
        categoryId: body.categoryId,
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

    return NextResponse.json({
      success: true,
      submissionId: submission.submissionId,
      message: "Submission received",
    });
  } catch (error: any) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create submission" },
      { status: 500 }
    );
  }
}
