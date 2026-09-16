import { prisma } from '@/lib/prisma';
import { MembersClient } from '@/components/MembersClient';

export const metadata = { title: 'Anggota Kelas' };
export const revalidate = 30;

export default async function MembersPage() {
  const members = await prisma.member.findMany({ orderBy: { orderIndex: 'asc' } });
  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Anggota Kelas</h1>
      <p className="text-muted mt-2">{members.length} siswa terdaftar di TJKT 1.</p>
      <MembersClient initial={JSON.parse(JSON.stringify(members))} />
    </div>
  );
}
