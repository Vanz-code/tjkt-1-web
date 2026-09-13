'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

const items = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/members', label: 'Members' },
  { href: '/admin/announcements', label: 'Announcements' },
  { href: '/admin/agenda', label: 'Agenda' },
  { href: '/admin/projects', label: 'Projects' },
];

export function AdminShell({ children, userName }: { children: React.ReactNode; userName: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const Nav = () => (
    <nav className="grid gap-1">
      {items.map((i) => {
        const active = path === i.href;
        return (
          <Link key={i.href} href={i.href} onClick={() => setOpen(false)} className={`px-3 py-2 rounded-lg text-sm ${active ? 'bg-accent text-black font-medium' : 'text-muted hover:text-fg hover:bg-surface'}`}>
            {i.label}
          </Link>
        );
      })}
      <button onClick={() => signOut({ callbackUrl: '/' })} className="px-3 py-2 mt-2 rounded-lg text-sm text-left text-red-400 hover:bg-red-500/10">Logout</button>
    </nav>
  );

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block border-r border-border bg-surface/30 p-4">
        <div className="mb-6">
          <div className="text-xs text-muted">Admin Panel</div>
          <div className="font-semibold">{userName}</div>
        </div>
        <Nav />
      </aside>
      <div className="lg:hidden flex items-center justify-between p-3 border-b border-border">
        <div className="font-semibold">Admin · {userName}</div>
        <button onClick={() => setOpen(!open)} className="w-9 h-9 rounded-lg border border-border">{open ? '✕' : '☰'}</button>
      </div>
      {open && <div className="lg:hidden p-3 border-b border-border bg-bg"><Nav /></div>}
      <main className="p-4 md:p-8">{children}</main>
    </div>
  );
}
