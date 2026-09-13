import { prisma } from '@/lib/prisma';
import { AnnouncementsAdmin } from './AnnouncementsAdmin';

export default async function Page() {
  const list = await prisma.announcement.findMany({ orderBy: { publishedAt: 'desc' } });
  return <AnnouncementsAdmin initial={JSON.parse(JSON.stringify(list))} />;
}
