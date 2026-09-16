import { prisma } from '@/lib/prisma';
import { GalleryGrid } from '@/components/GalleryGrid';

export const metadata = { title: 'Dokumentasi' };
export const revalidate = 60;

export default async function GalleryPage() {
  const [albums, photos] = await Promise.all([
    prisma.album.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.photo.findMany({ orderBy: { takenAt: 'desc' } }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Dokumentasi Kelas</h1>
      <p className="text-muted mt-2">
        {photos.length} foto dari {albums.length} album.
      </p>
      <GalleryGrid
        albums={JSON.parse(JSON.stringify(albums))}
        photos={JSON.parse(JSON.stringify(photos))}
      />
    </div>
  );
}
