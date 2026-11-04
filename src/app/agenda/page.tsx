export default function AgendaPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="text-4xl font-bold mb-4 text-center">Event Agenda</h1>
        <p className="text-charcoal-400 text-center mb-12">
          Detailed timings will be published once confirmed. The agenda below is indicative.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-charcoal-700 p-8">
            <p className="text-gold-400 text-sm uppercase tracking-wider mb-2">Day 1 · 20 February 2027</p>
            <h2 className="text-2xl font-bold mb-6">Creative Experience</h2>
            <ul className="space-y-4 text-charcoal-300">
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">09:00</span> Registration & Welcome</li>
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">10:00</span> Opening Ceremony</li>
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">11:00</span> Industry Keynote</li>
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">12:30</span> Lunch & Networking</li>
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">14:00</span> Creative Discussions & Showcases</li>
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">17:00</span> Closing for Day 1</li>
            </ul>
          </div>
          <div className="border border-charcoal-700 p-8">
            <p className="text-gold-400 text-sm uppercase tracking-wider mb-2">Day 2 · 21 February 2027</p>
            <h2 className="text-2xl font-bold mb-6">Grand Award Night</h2>
            <ul className="space-y-4 text-charcoal-300">
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">16:00</span> Guest Arrival</li>
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">17:30</span> Welcome Address</li>
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">18:00</span> Award Presentations</li>
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">20:00</span> Winner Announcements</li>
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">21:00</span> Special Performances</li>
              <li className="flex gap-4"><span className="text-gold-500 font-mono w-20">22:00</span> Closing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
