import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding The AdSphere Awards database...");

  const passwordHash = await bcrypt.hash("Admin@AdSphere2027", 12);
  await prisma.user.upsert({
    where: { email: "admin@adsphereawards.com" },
    update: {},
    create: {
      email: "admin@adsphereawards.com",
      passwordHash,
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
    },
  });
  console.log("Admin: admin@adsphereawards.com / Admin@AdSphere2027");

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
    { name: "Best Print / Outdoor", slug: "best-print-outdoor", description: "Excellence in print, outdoor and ambient advertising.", entryType: "agency", sortOrder: 7 },
    { name: "Best Social Media Campaign", slug: "best-social-media-campaign", description: "Outstanding social-first campaigns and community engagement.", entryType: "agency", sortOrder: 8 },
  ];

  for (const cat of categories) {
    await prisma.awardCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, isActive: true },
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
  console.log("Seeded", categories.length, "award categories");

  const criteriaCount = await prisma.evaluationCriterion.count();
  if (criteriaCount === 0) {
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
  }

  const sponsors = [
    { name: "CreativeForge Studio", tier: "GOLD" as const, description: "Leading creative production partner supporting excellence in brand storytelling.", website: "https://example.com", sortOrder: 1 },
    { name: "BrandVista Media", tier: "SILVER" as const, description: "Media and strategy partner for the advertising industry.", website: "https://example.com", sortOrder: 2 },
    { name: "IdeaLab India", tier: "BRONZE" as const, description: "Innovation lab backing emerging creative talent.", website: "https://example.com", sortOrder: 3 },
    { name: "Pixel & Type", tier: "PARTNER" as const, description: "Design and typography studio.", website: "https://example.com", sortOrder: 4 },
  ];
  for (const s of sponsors) {
    const existing = await prisma.sponsor.findFirst({ where: { name: s.name } });
    if (!existing) {
      await prisma.sponsor.create({ data: { ...s, isPublished: true } });
    } else {
      await prisma.sponsor.update({
        where: { id: existing.id },
        data: { isPublished: true, description: s.description, tier: s.tier },
      });
    }
  }
  console.log("Seeded sponsors");

  const speakers = [
    {
      name: "Ananya Krishnan",
      designation: "Chief Creative Officer",
      organisation: "Horizon Advertising",
      biography: "Award-winning creative leader with two decades of experience building iconic Indian brands.",
      expertise: "Brand Strategy, Creative Direction",
      sessionRole: "Keynote – Day 1",
      sortOrder: 1,
    },
    {
      name: "Rohan Mehta",
      designation: "Founder & Creative Director",
      organisation: "Studio North",
      biography: "Founder of Studio North. Known for craft-led campaigns across film, digital and experiential.",
      expertise: "Film, Craft, Storytelling",
      sessionRole: "Jury – Film & Digital",
      sortOrder: 2,
    },
    {
      name: "Priya Nair",
      designation: "Head of Brand Marketing",
      organisation: "Aether Consumer Brands",
      biography: "Brand marketer who has led multi-market launches and purpose-led campaigns for leading FMCG brands.",
      expertise: "Brand Marketing, Purpose",
      sessionRole: "Panel – Brand Building",
      sortOrder: 3,
    },
    {
      name: "Vikram Shah",
      designation: "Independent Creative Consultant",
      organisation: "Formerly Leo Burnett",
      biography: "Independent consultant and mentor to young creatives. Multiple national award wins across print and integrated.",
      expertise: "Creative Mentorship, Print",
      sessionRole: "Jury – Print & Integrated",
      sortOrder: 4,
    },
  ];
  for (const sp of speakers) {
    const existing = await prisma.speaker.findFirst({ where: { name: sp.name } });
    if (!existing) {
      await prisma.speaker.create({ data: { ...sp, isPublished: true } });
    } else {
      await prisma.speaker.update({
        where: { id: existing.id },
        data: { isPublished: true, biography: sp.biography, designation: sp.designation },
      });
    }
  }
  console.log("Seeded speakers");

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
