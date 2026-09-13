import { prisma } from '@/lib/prisma';
import { AgendaAdmin } from './AgendaAdmin';

export default async function Page() {
  const list = await prisma.event.findMany({ orderBy: { date: 'desc' } });
  return <AgendaAdmin initial={JSON.parse(JSON.stringify(list))} />;
}
