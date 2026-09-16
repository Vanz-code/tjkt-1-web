import { prisma } from '@/lib/prisma';
import { FadeIn } from '@/components/FadeIn';

export const metadata = { title: 'Pengumuman' };
export const revalidate = 30;

export default async function AnnouncementsPage() {
  const list = await prisma.announcement.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
  });
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Pengumuman</h1>
      <p className="text-muted mt-2">Informasi dan pengumuman kelas TJKT 1.</p>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {list.map((a, i) => (
          <FadeIn key={a.id} delay={i * 0.05}>
            <article className="rounded-2xl border border-border bg-surface p-5 hover:border-cyan-400 transition-all h-full">
              <span className="text-xs px-2 py-0.5 rounded border border-border text-muted">
                {a.category}
              </span>
              <h3 className="mt-3 font-semibold text-lg line-clamp-2">{a.title}</h3>
              <p className="mt-2 text-sm text-muted line-clamp-3">{a.content}</p>
              <div className="mt-4 text-xs text-muted">
                {new Date(a.publishedAt).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
