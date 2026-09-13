import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminHome() {
  const [members, announcements, events, projects] = await Promise.all([
    prisma.member.count(),
    prisma.announcement.count(),
    prisma.event.count(),
    prisma.project.count(),
  ]);
  const stats = [
    { label: 'Members', value: members, href: '/admin/members' },
    { label: 'Announcements', value: announcements, href: '/admin/announcements' },
    { label: 'Events', value: events, href: '/admin/agenda' },
    { label: 'Projects', value: projects, href: '/admin/projects' },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-muted text-sm mt-1">Ringkasan data kelas TJKT 1.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-2xl border border-border bg-surface p-5 hover:border-accent transition">
            <div className="text-sm text-muted">{s.label}</div>
            <div className="text-3xl font-bold text-accent mt-1">{s.value}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
