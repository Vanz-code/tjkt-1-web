import { prisma } from '@/lib/prisma';
export const metadata = { title: 'Project' };
export const revalidate = 60;

export default async function ProjectsPage() {
  const list = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Project Siswa</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {list.map((p) => (
          <article key={p.id} className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-muted mt-2">{p.description}</p>
            <div className="mt-3 text-xs text-muted">oleh {p.author}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
