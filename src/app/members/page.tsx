import { prisma } from '@/lib/prisma';
export const metadata = { title: 'Anggota' };
export const revalidate = 30;

export default async function MembersPage() {
  const members = await prisma.member.findMany({ orderBy: { orderIndex: 'asc' } });
  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Anggota Kelas</h1>
      <p className="text-muted mt-2">{members.length} siswa TJKT 1.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {members.map((m) => (
          <div key={m.id} className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="aspect-[4/5] bg-gradient-to-br from-surface to-bg grid place-items-center text-muted text-4xl">{m.name.charAt(0)}</div>
            <div className="p-4">
              <div className="font-semibold truncate">{m.name}</div>
              <div className="text-sm text-accent">{m.position || 'Anggota'}</div>
              <div className="mt-1 text-xs text-muted">No. {String(m.attendanceNumber ?? 0).padStart(2, '0')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
