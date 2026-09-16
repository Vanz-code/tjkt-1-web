import { prisma } from '@/lib/prisma';
import { Hero } from '@/components/Hero';
import Link from 'next/link';

export const revalidate = 30;

export default async function HomePage() {
  const [members, projects, events, albums] = await Promise.all([
    prisma.member.count(),
    prisma.project.count(),
    prisma.event.count(),
    prisma.album.count(),
  ]);

  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Students', value: members },
            { label: 'Projects', value: projects },
            { label: 'Events', value: events },
            { label: 'Albums', value: albums },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-surface p-6 text-center hover:border-cyan-400 transition">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400">{s.value}</div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
