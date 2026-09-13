import { prisma } from '@/lib/prisma';
import { ProjectsAdmin } from './ProjectsAdmin';

export default async function Page() {
  const list = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return <ProjectsAdmin initial={JSON.parse(JSON.stringify(list))} />;
}
