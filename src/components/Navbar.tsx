'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/members', label: 'Members' },
  { href: '/organization', label: 'Organization' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/agenda', label: 'Agenda' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/projects', label: 'Projects' },
];

export function Navbar() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-14 px-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 grid place-items-center text-black font-bold">
            T1
          </span>
          <span className="font-semibold">TJKT 1</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((i) => {
            const active = path === i.href;
            return (
              <Link
                key={i.href}
                href={i.href}
                className={`px-3 py-2 rounded-md text-sm transition ${
                  active
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {i.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden sm:inline-flex h-9 px-3 rounded-lg border border-border bg-surface text-sm items-center"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
