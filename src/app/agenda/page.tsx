import { prisma } from '@/lib/prisma';
export const metadata = { title: 'Agenda' };
export const revalidate = 30;

export default async function AgendaPage() {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Agenda</h1>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {events.map((e) => (
          <div key={e.id} className="rounded-2xl border border-border bg-surface p-5 flex gap-4">
            <div className="shrink-0 w-16 text-center">
              <div className="text-xs text-muted uppercase">{new Date(e.date).toLocaleString('id-ID', { month: 'short' })}</div>
              <div className="text-2xl font-bold">{String(new Date(e.date).getDate()).padStart(2, '0')}</div>
            </div>
            <div>
              <h3 className="font-semibold">{e.title}</h3>
              <div className="text-sm text-muted mt-1">{e.time} • {e.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
