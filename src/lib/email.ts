import { Resend } from "resend";
import { prisma } from "./prisma";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.RESEND_FROM_EMAIL || "noreply@adsphereawards.com";
const FROM_NAME = process.env.RESEND_FROM_NAME || "The AdSphere Awards";

export async function sendEmail({
  to,
  subject,
  html,
  text,
  templateName,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  templateName?: string;
}) {
  if (!resend) {
    console.warn("Resend not configured. Email skipped:", subject);
    await prisma.emailLog.create({
      data: {
        toEmail: to,
        subject,
        templateName,
        status: "skipped",
        errorMessage: "RESEND_API_KEY not configured",
      },
    });
    return { success: false, error: "Email service not configured" };
  }

  try {
    const result = await resend.emails.send({
      from: `${FROM_NAME} <${FROM}>`,
      to,
      subject,
      html,
      text,
    });

    await prisma.emailLog.create({
      data: {
        toEmail: to,
        subject,
        templateName,
        status: "sent",
        resendId: result.data?.id,
        sentAt: new Date(),
      },
    });

    return { success: true, id: result.data?.id };
  } catch (error: any) {
    await prisma.emailLog.create({
      data: {
        toEmail: to,
        subject,
        templateName,
        status: "failed",
        errorMessage: error.message,
      },
    });
    return { success: false, error: error.message };
  }
}

export function replaceVariables(
  template: string,
  vars: Record<string, string>
): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), value || "");
  }
  return result;
}
