export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-charcoal-300 mb-8">
          For enquiries about The AdSphere Awards, submissions, registrations or
          partnerships, please reach out using the details below.
        </p>
        <div className="space-y-6 border border-charcoal-700 p-8">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gold-400 mb-1">
              General Enquiries
            </h3>
            <p className="text-lg">info@adsphereawards.com</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gold-400 mb-1">
              Award Submissions
            </h3>
            <p className="text-lg">entries@adsphereawards.com</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gold-400 mb-1">
              Registration Support
            </h3>
            <p className="text-lg">register@adsphereawards.com</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gold-400 mb-1">
              Location
            </h3>
            <p className="text-lg">Bengaluru, Karnataka, India</p>
            <p className="text-sm text-charcoal-400 mt-1">
              Venue details will be announced once confirmed.
            </p>
          </div>
        </div>
        <p className="text-sm text-charcoal-500 mt-8">
          Internal SPOC contact details are available only to authorised personnel
          through the administration dashboard.
        </p>
      </div>
    </div>
  );
}
