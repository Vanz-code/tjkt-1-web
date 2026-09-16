import { prisma } from '@/lib/prisma';
import { FadeIn } from '@/components/FadeIn';
import Image from 'next/image';

export const metadata = { title: 'Anggota Kelas' };
export const revalidate = 30;

export default async function MembersPage() {
  const members = await prisma.member.findMany({ orderBy: { orderIndex: 'asc' } });
  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Anggota Kelas</h1>
      <p className="text-muted mt-2">{members.length} siswa terdaftar di TJKT 1.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {members.map((m, i) => (
          <FadeIn key={m.id} delay={i * 0.05}>
            <div className="group rounded-2xl border border-border bg-surface overflow-hidden hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[4/5] relative bg-gradient-to-br from-surface to-bg overflow-hidden">
                <Image
                  src={m.photo || '/placeholder/student.svg'}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="font-semibold truncate">{m.name}</div>
                <div className="text-sm text-cyan-400 truncate">{m.position || 'Anggota'}</div>
                <div className="mt-1 text-xs text-muted">No. Absen {String(m.attendanceNumber ?? 0).padStart(2, '0')}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
