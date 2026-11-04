import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateRegistrationId,
  generateTicketNumber,
  generateQrToken,
} from "@/lib/utils";
import { sendEmail, replaceVariables } from "@/lib/email";
import QRCode from "qrcode";
import { AttendeeCategory, PreferredDay } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.email || !body.mobile || !body.city) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.attendee.findUnique({
      where: { email: body.email.toLowerCase() },
    });
    if (existing) {
      return NextResponse.json(
        { error: "This email is already registered. Please check your inbox or contact support." },
        { status: 409 }
      );
    }

    const registrationId = generateRegistrationId();
    const ticketNumber = generateTicketNumber();
    const qrToken = generateQrToken();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verifyUrl = `${appUrl}/api/tickets/verify?token=${qrToken}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verifyUrl, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 300,
      color: { dark: "#1a1a1a", light: "#ffffff" },
    });

    const attendee = await prisma.$transaction(async (tx) => {
      const a = await tx.attendee.create({
        data: {
          registrationId,
          fullName: body.fullName,
          email: body.email.toLowerCase(),
          mobile: body.mobile,
          organisation: body.organisation || null,
          designation: body.designation || null,
          city: body.city,
          country: body.country || "India",
          category: (body.category as AttendeeCategory) || "OTHER",
          preferredDay: (body.preferredDay as PreferredDay) || "BOTH",
          dietaryRequirements: body.dietaryRequirements || null,
          accessibilityNeeds: body.accessibilityNeeds || null,
          acceptedTerms: !!body.acceptedTerms,
          status: "CONFIRMED",
        },
      });

      await tx.ticket.create({
        data: {
          attendeeId: a.id,
          ticketNumber,
          qrToken,
          qrCodeDataUrl,
          status: "VALID",
        },
      });

      return a;
    });

    const template = await prisma.emailTemplate.findUnique({
      where: { name: "attendee_confirmation" },
    });
    if (template) {
      const html = replaceVariables(template.bodyHtml, {
        participant_name: attendee.fullName,
        registration_id: registrationId,
        ticket_number: ticketNumber,
        event_name: "The AdSphere Awards",
        event_date: "20–21 February 2027",
      });
      await sendEmail({
        to: attendee.email,
        subject: template.subject,
        html: html + `<p><a href="${appUrl}/ticket/${qrToken}">View your ticket</a></p>`,
        templateName: "attendee_confirmation",
      });
    }

    return NextResponse.json({
      success: true,
      registrationId,
      ticketNumber,
      message: "Registration successful",
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
