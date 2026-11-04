import Link from "next/link";
import { Countdown } from "@/components/Countdown";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/30 via-transparent to-transparent" />
        
        <div className="relative z-10 container-narrow text-center px-4 py-20">
          <p className="text-gold-400 text-sm uppercase tracking-[0.3em] mb-4">
            20–21 February 2027 · Bengaluru
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="block text-white">The</span>
            <span className="gold-text">AdSphere</span>
            <span className="block text-white">Awards</span>
          </h1>
          <p className="text-xl md:text-2xl text-charcoal-300 font-light mb-4 max-w-2xl mx-auto">
            Where Ideas Become Icons.
          </p>
          <p className="text-charcoal-400 max-w-xl mx-auto mb-10">
            Celebrating outstanding achievements in advertising, branding,
            marketing and creative communication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/submit"
              className="px-8 py-4 bg-gold-500 text-charcoal-950 font-semibold rounded-sm hover:bg-gold-400 transition text-lg"
            >
              Submit Your Entry
            </Link>
            <Link
              href="/register"
              className="px-8 py-4 border border-gold-500 text-gold-400 font-semibold rounded-sm hover:bg-gold-500/10 transition text-lg"
            >
              Register to Attend
            </Link>
          </div>

          <Countdown targetDate="2027-02-20T09:00:00+05:30" />
        </div>
      </section>

      <section className="section-padding border-t border-charcoal-800">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Recognising Creative Excellence
            </h2>
            <p className="text-charcoal-300 text-lg leading-relaxed mb-8">
              The AdSphere Awards is a premier platform that honours the most
              impactful advertising campaigns, innovative brand strategies and
              exceptional creative work. From agencies and brands to individual
              creatives and emerging talent — this is where ideas are celebrated
              and icons are born.
            </p>
            <Link
              href="/about"
              className="text-gold-400 hover:text-gold-300 font-medium inline-flex items-center gap-2"
            >
              Learn more about the awards →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal-900/50">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Award Categories
          </h2>
          <p className="text-charcoal-400 text-center mb-12 max-w-2xl mx-auto">
            Categories are managed by the organising team and will be updated as
            the programme is finalised.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Best Brand Campaign",
              "Best Creative Idea",
              "Best Digital Campaign",
              "Best Film / TV Commercial",
              "Best Integrated Campaign",
              "Young Creative of the Year",
            ].map((name) => (
              <div
                key={name}
                className="border border-charcoal-700 p-6 hover:border-gold-500/50 transition group"
              >
                <h3 className="text-lg font-semibold group-hover:text-gold-400 transition">
                  {name}
                </h3>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/categories"
              className="px-6 py-3 border border-gold-500 text-gold-400 hover:bg-gold-500/10 rounded-sm transition"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Two Days of Inspiration
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-charcoal-700 p-8">
              <p className="text-gold-400 text-sm uppercase tracking-wider mb-2">
                Day 1 · 20 February 2027
              </p>
              <h3 className="text-2xl font-bold mb-4">Creative Experience</h3>
              <ul className="space-y-2 text-charcoal-300">
                <li>• Registration & Welcome</li>
                <li>• Opening Ceremony</li>
                <li>• Industry Keynotes</li>
                <li>• Branding & Creative Discussions</li>
                <li>• Creative Showcases</li>
                <li>• Networking Sessions</li>
              </ul>
            </div>
            <div className="border border-charcoal-700 p-8">
              <p className="text-gold-400 text-sm uppercase tracking-wider mb-2">
                Day 2 · 21 February 2027
              </p>
              <h3 className="text-2xl font-bold mb-4">Grand Award Night</h3>
              <ul className="space-y-2 text-charcoal-300">
                <li>• Guest Arrival</li>
                <li>• Welcome Address</li>
                <li>• Award Category Presentations</li>
                <li>• Nominee Recognition</li>
                <li>• Winner Announcements</li>
                <li>• Special Performances & Closing</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/agenda"
              className="text-gold-400 hover:text-gold-300 font-medium"
            >
              View full agenda →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-charcoal-900 via-charcoal-950 to-charcoal-900 border-y border-charcoal-800">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make Your Mark?
          </h2>
          <p className="text-charcoal-300 mb-8 max-w-xl mx-auto">
            Whether you are submitting a campaign or joining us as a guest —
            be part of the celebration of creative excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="px-8 py-4 bg-gold-500 text-charcoal-950 font-semibold rounded-sm hover:bg-gold-400 transition"
            >
              Submit Your Campaign
            </Link>
            <Link
              href="/register"
              className="px-8 py-4 border border-white/30 text-white hover:border-gold-400 hover:text-gold-400 rounded-sm transition"
            >
              Register as Attendee
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
