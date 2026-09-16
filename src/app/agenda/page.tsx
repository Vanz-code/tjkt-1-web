import { prisma } from '@/lib/prisma';
import { FadeIn } from '@/components/FadeIn';

export const metadata = { title: 'Agenda' };
export const revalidate = 30;

export default async function AgendaPage() {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Agenda Kelas</h1>
      <p className="text-muted mt-2">Jadwal kegiatan kelas TJKT 1.</p>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {events.map((e, i) => (
          <FadeIn key={e.id} delay={i * 0.05}>
            <div className="rounded-2xl border border-border bg-surface p-5 flex gap-4 hover:border-cyan-400 transition-all h-full">
              <div className="shrink-0 w-16 text-center">
                <div className="text-xs text-muted uppercase">
                  {new Date(e.date).toLocaleString('id-ID', { month: 'short' })}
                </div>
                <div className="text-2xl font-bold text-cyan-400">
                  {String(new Date(e.date).getDate()).padStart(2, '0')}
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{e.title}</h3>
                <div className="text-sm text-muted mt-1">
                  {e.time} {e.location && `• ${e.location}`}
                </div>
                {e.description && (
                  <p className="text-sm text-muted mt-2 line-clamp-2">{e.description}</p>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
