export default function VenuePage() {
  return (
    <div className="section-padding">
      <div className="container-narrow max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Venue & Location</h1>
        <p className="text-charcoal-300 mb-6">
          The AdSphere Awards will be held in <strong className="text-white">Bengaluru, Karnataka, India</strong>.
        </p>
        <div className="border border-charcoal-700 p-8">
          <h2 className="text-xl font-semibold text-gold-400 mb-4">Proposed Location</h2>
          <p className="text-charcoal-300">Bengaluru, Karnataka, India</p>
          <p className="text-sm text-charcoal-500 mt-4">
            Exact venue details will be published once confirmed.
          </p>
        </div>
      </div>
    </div>
  );
}
