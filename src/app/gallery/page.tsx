import { prisma } from '@/lib/prisma';
export const metadata = { title: 'Dokumentasi' };
export const revalidate = 60;

export default async function GalleryPage() {
  const photos = await prisma.photo.findMany({ orderBy: { takenAt: 'desc' } });
  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Dokumentasi</h1>
      <p className="text-muted mt-2">{photos.length} foto.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
        {photos.map((p) => (
          <div key={p.id} className="aspect-square rounded-xl border border-border bg-surface grid place-items-center text-muted text-xs p-2 text-center">{p.caption}</div>
        ))}
      </div>
    </div>
  );
}
