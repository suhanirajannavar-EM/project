import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-charcoal-800 bg-charcoal-950">
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-3">
              <span className="gold-text">AdSphere</span> Awards
            </h3>
            <p className="text-charcoal-400 text-sm max-w-md">
              Where Ideas Become Icons. Celebrating excellence in advertising,
              branding and creative communication. 20–21 February 2027, Bengaluru.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gold-400 mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-400">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link href="/submit" className="hover:text-white">Submit Entry</Link></li>
              <li><Link href="/register" className="hover:text-white">Register</Link></li>
              <li><Link href="/agenda" className="hover:text-white">Agenda</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gold-400 mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-400">
              <li><Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link href="/legal/submission-terms" className="hover:text-white">Submission Terms</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/admin/login" className="hover:text-white">Admin Login</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-charcoal-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-charcoal-500">
          <p>© 2026–2027 The AdSphere Awards. All rights reserved.</p>
          <p>Where Ideas Become Icons.</p>
        </div>
      </div>
    </footer>
  );
}
