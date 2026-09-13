import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const [members, projects, events, albums] = await Promise.all([
    prisma.member.count(),
    prisma.project.count(),
    prisma.event.count(),
    prisma.album.count(),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-6xl font-bold">
        <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">TJKT 1</span>
      </h1>
      <p className="text-lg text-muted mt-3">Teknik Jaringan Komputer dan Telekomunikasi</p>
      <p className="mt-1 text-sm font-mono text-accent">Connect • Create • Collaborate</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <Stat label="Students" value={members} />
        <Stat label="Projects" value={projects} />
        <Stat label="Events" value={events} />
        <Stat label="Albums" value={albums} />
      </div>

      <p className="mt-10 text-sm text-muted">✅ Project berhasil jalan!</p>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 text-center">
      <div className="text-3xl font-bold text-accent">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}
