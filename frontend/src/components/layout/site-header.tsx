import Link from "next/link";

const navigationLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Teams", href: "#teams" },
];

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900">
          HireFlow<span className="text-blue-600"> AI</span>
        </Link>

        {/* Navigation links */}
        <div className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:inline-flex"
          >
            Sign In
          </a>

          <a
            href="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Mobile navigation links */}
      <div className="flex justify-center gap-5 border-t border-slate-100 px-4 py-3 md:hidden">
        {navigationLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs font-medium text-slate-600 hover:text-blue-600"
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
