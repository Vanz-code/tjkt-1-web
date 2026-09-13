import { prisma } from '@/lib/prisma';
export const metadata = { title: 'Pengumuman' };
export const revalidate = 30;

export default async function AnnouncementsPage() {
  const list = await prisma.announcement.findMany({ where: { status: 'published' }, orderBy: { publishedAt: 'desc' } });
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Pengumuman</h1>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {list.map((a) => (
          <article key={a.id} className="rounded-2xl border border-border bg-surface p-5">
            <span className="text-xs px-2 py-0.5 rounded border border-border text-muted">{a.category}</span>
            <h3 className="mt-3 font-semibold text-lg">{a.title}</h3>
            <p className="mt-2 text-sm text-muted">{a.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
