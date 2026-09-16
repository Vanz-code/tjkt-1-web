import { prisma } from '@/lib/prisma';
import { FadeIn } from '@/components/FadeIn';
import Image from 'next/image';

export const metadata = { title: 'Project' };
export const revalidate = 60;

export default async function ProjectsPage() {
  const list = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Project Siswa</h1>
      <p className="text-muted mt-2">Karya dan inovasi siswa TJKT 1.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {list.map((p, i) => (
          <FadeIn key={p.id} delay={i * 0.05}>
            <article className="rounded-2xl border border-border bg-surface overflow-hidden hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
              <div className="aspect-video relative bg-gradient-to-br from-surface to-bg">
                <Image
                  src={p.image || '/placeholder/project.svg'}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold truncate">{p.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded border ${p.status === 'completed' ? 'border-emerald-500/30 text-emerald-400' : 'border-amber-500/30 text-amber-400'}`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-sm text-muted mt-2 line-clamp-2">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.technologies.split(',').map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded border border-border text-muted">
                      {t.trim()}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs text-muted">oleh {p.author}</div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
