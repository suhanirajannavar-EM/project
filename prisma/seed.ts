import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding The AdSphere Awards database...");

  const passwordHash = await bcrypt.hash("Admin@AdSphere2027", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@adsphereawards.com" },
    update: {},
    create: {
      email: "admin@adsphereawards.com",
      passwordHash,
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
    },
  });
  console.log("Created admin:", admin.email);

  await prisma.event.upsert({
    where: { id: "default-event" },
    update: {},
    create: {
      id: "default-event",
      name: "The AdSphere Awards",
      tagline: "Where Ideas Become Icons.",
      description:
        "The AdSphere Awards recognises outstanding achievements in advertising, branding, marketing, creative communication and innovative campaigns.",
      startDate: new Date("2027-02-20T09:00:00Z"),
      endDate: new Date("2027-02-21T22:00:00Z"),
      location: "Bengaluru, Karnataka, India",
      isPublished: true,
    },
  });

  const categories = [
    { name: "Best Brand Campaign", slug: "best-brand-campaign", description: "Outstanding brand campaigns that delivered measurable impact and cultural relevance.", entryType: "brand", sortOrder: 1 },
    { name: "Best Creative Idea", slug: "best-creative-idea", description: "Most original and inventive creative concepts across any medium.", entryType: "agency", sortOrder: 2 },
    { name: "Best Digital Campaign", slug: "best-digital-campaign", description: "Excellence in digital advertising, social, content and interactive experiences.", entryType: "agency", sortOrder: 3 },
    { name: "Best Film / TV Commercial", slug: "best-film-tv-commercial", description: "Outstanding television, cinema or online film advertising.", entryType: "agency", sortOrder: 4 },
    { name: "Best Integrated Campaign", slug: "best-integrated-campaign", description: "Campaigns that seamlessly integrate across multiple channels and touchpoints.", entryType: "agency", sortOrder: 5 },
    { name: "Young Creative of the Year", slug: "young-creative-of-the-year", description: "Recognising exceptional talent under 30 years of age.", entryType: "individual", sortOrder: 6 },
  ];

  for (const cat of categories) {
    await prisma.awardCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        ...cat,
        isActive: true,
        submissionOpen: new Date("2026-09-01"),
        submissionClose: new Date("2027-01-15"),
        eligibility: "Open to agencies, brands and individuals based in India and the region.",
        guidelines: "Submit a clear campaign overview, creative assets and results where available.",
      },
    });
  }
  console.log("Seeded award categories");

  const criteria = [
    { name: "Originality & Creativity", maxScore: 10, sortOrder: 1 },
    { name: "Strategic Thinking", maxScore: 10, sortOrder: 2 },
    { name: "Quality of Execution", maxScore: 10, sortOrder: 3 },
    { name: "Brand Communication", maxScore: 10, sortOrder: 4 },
    { name: "Audience Engagement", maxScore: 10, sortOrder: 5 },
    { name: "Innovation & Impact", maxScore: 10, sortOrder: 6 },
  ];

  for (const c of criteria) {
    await prisma.evaluationCriterion.create({ data: { ...c, isActive: true } });
  }
  console.log("Seeded evaluation criteria");

  await prisma.emailTemplate.upsert({
    where: { name: "attendee_confirmation" },
    update: {},
    create: {
      name: "attendee_confirmation",
      subject: "Registration Confirmed – The AdSphere Awards 2027",
      bodyHtml: `<h1>Welcome to The AdSphere Awards</h1><p>Dear {{participant_name}},</p><p>Your registration has been confirmed.</p><p><strong>Registration ID:</strong> {{registration_id}}</p><p><strong>Ticket Number:</strong> {{ticket_number}}</p><p>Event: 20–21 February 2027 | Bengaluru</p>`,
      variables: ["participant_name", "registration_id", "ticket_number", "event_name", "event_date"],
    },
  });

  await prisma.emailTemplate.upsert({
    where: { name: "submission_confirmation" },
    update: {},
    create: {
      name: "submission_confirmation",
      subject: "Award Entry Received – The AdSphere Awards",
      bodyHtml: `<h1>Submission Received</h1><p>Dear {{participant_name}},</p><p>Thank you for submitting your campaign.</p><p><strong>Submission ID:</strong> {{submission_id}}</p><p><strong>Category:</strong> {{award_category}}</p>`,
      variables: ["participant_name", "submission_id", "award_category"],
    },
  });

  console.log("Seed completed successfully.");
  console.log("Admin login: admin@adsphereawards.com / Admin@AdSphere2027");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
