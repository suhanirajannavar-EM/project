import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  let stats = {
    attendees: 0,
    submissions: 0,
    categories: 0,
    sponsors: 0,
    speakers: 0,
  };

  try {
    const [attendees, submissions, categories, sponsors, speakers] = await Promise.all([
      prisma.attendee.count(),
      prisma.awardSubmission.count(),
      prisma.awardCategory.count({ where: { isActive: true } }),
      prisma.sponsor.count({ where: { isPublished: true } }),
      prisma.speaker.count({ where: { isPublished: true } }),
    ]);
    stats = { attendees, submissions, categories, sponsors, speakers };
  } catch {
    // DB may not be ready
  }

  return (
    <div className="min-h-screen bg-charcoal-950 text-white">
      <header className="border-b border-charcoal-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <span className="gold-text">AdSphere</span> Admin
        </h1>
        <div className="text-sm text-charcoal-400">
          {(session.user as any)?.email} · {(session.user as any)?.role}
        </div>
      </header>
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { label: "Attendees", value: stats.attendees },
            { label: "Submissions", value: stats.submissions },
            { label: "Categories", value: stats.categories },
            { label: "Sponsors", value: stats.sponsors },
            { label: "Speakers", value: stats.speakers },
          ].map((s) => (
            <div key={s.label} className="border border-charcoal-700 p-4 text-center">
              <div className="text-3xl font-bold text-gold-400">{s.value}</div>
              <div className="text-sm text-charcoal-400">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/admin/submissions" className="border border-charcoal-700 p-6 hover:border-gold-500/50 transition">
            <h3 className="font-semibold text-gold-400">Award Submissions</h3>
            <p className="text-sm text-charcoal-400 mt-1">Review and manage entries</p>
          </Link>
          <Link href="/admin/registrations" className="border border-charcoal-700 p-6 hover:border-gold-500/50 transition">
            <h3 className="font-semibold text-gold-400">Attendee Registrations</h3>
            <p className="text-sm text-charcoal-400 mt-1">Manage registrations & tickets</p>
          </Link>
          <Link href="/admin/categories" className="border border-charcoal-700 p-6 hover:border-gold-500/50 transition">
            <h3 className="font-semibold text-gold-400">Award Categories</h3>
            <p className="text-sm text-charcoal-400 mt-1">Add / edit categories</p>
          </Link>
          <Link href="/admin/sponsors" className="border border-charcoal-700 p-6 hover:border-gold-500/50 transition">
            <h3 className="font-semibold text-gold-400">Sponsors</h3>
            <p className="text-sm text-charcoal-400 mt-1">Manage sponsor profiles</p>
          </Link>
          <Link href="/admin/speakers" className="border border-charcoal-700 p-6 hover:border-gold-500/50 transition">
            <h3 className="font-semibold text-gold-400">Speakers & Jury</h3>
            <p className="text-sm text-charcoal-400 mt-1">Manage profiles</p>
          </Link>
          <Link href="/admin/agenda" className="border border-charcoal-700 p-6 hover:border-gold-500/50 transition">
            <h3 className="font-semibold text-gold-400">Event Agenda</h3>
            <p className="text-sm text-charcoal-400 mt-1">Edit sessions & timings</p>
          </Link>
        </div>

        <p className="text-sm text-charcoal-500 mt-10">
          Connect your Neon database and run <code className="text-gold-400">npm run db:push && npm run db:seed</code> to activate live data.
        </p>
      </div>
    </div>
  );
}
