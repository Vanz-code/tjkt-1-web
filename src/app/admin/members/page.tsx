import { prisma } from '@/lib/prisma';
import { MembersAdmin } from './MembersAdmin';

export default async function Page() {
  const members = await prisma.member.findMany({ orderBy: { orderIndex: 'asc' } });
  return <MembersAdmin initial={JSON.parse(JSON.stringify(members))} />;
}
