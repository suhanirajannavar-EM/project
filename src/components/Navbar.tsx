"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/categories", label: "Categories" },
  { href: "/submit", label: "Submit Entry" },
  { href: "/nominees", label: "Nominees" },
  { href: "/speakers", label: "Speakers" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/agenda", label: "Agenda" },
  { href: "/register", label: "Register" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal-800 bg-charcoal-950/95 backdrop-blur-md">
      <div className="container-narrow flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-bold tracking-tight">
            <span className="gold-text">AdSphere</span>
            <span className="text-white ml-1">Awards</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-charcoal-300 hover:text-gold-400 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/submit"
            className="px-4 py-2 text-sm border border-gold-500 text-gold-400 hover:bg-gold-500/10 rounded transition"
          >
            Submit Entry
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm bg-gold-500 text-charcoal-950 font-medium rounded hover:bg-gold-400 transition"
          >
            Register to Attend
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-charcoal-800 bg-charcoal-950">
          <nav className="flex flex-col p-4 gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-charcoal-200 hover:text-gold-400 py-2"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-charcoal-800">
              <Link
                href="/submit"
                className="text-center py-2 border border-gold-500 text-gold-400 rounded"
                onClick={() => setOpen(false)}
              >
                Submit Entry
              </Link>
              <Link
                href="/register"
                className="text-center py-2 bg-gold-500 text-charcoal-950 font-medium rounded"
                onClick={() => setOpen(false)}
              >
                Register to Attend
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
