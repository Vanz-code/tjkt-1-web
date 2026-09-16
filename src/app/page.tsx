import { prisma } from '@/lib/prisma';
import { Hero } from '@/components/Hero';
import { FadeIn } from '@/components/FadeIn';
import Link from 'next/link';

export const revalidate = 30;

export default async function HomePage() {
  const [members, projects, events, albums] = await Promise.all([
    prisma.member.count(),
    prisma.project.count(),
    prisma.event.count(),
    prisma.album.count(),
  ]);

  const stats = [
    { label: 'Students', value: members },
    { label: 'Projects', value: projects },
    { label: 'Events', value: events },
    { label: 'Albums', value: albums },
  ];

  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-surface p-6 text-center hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400">{s.value}</div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
