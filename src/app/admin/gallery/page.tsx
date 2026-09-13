import { prisma } from '@/lib/prisma';
import { GalleryAdmin } from './GalleryAdmin';

export default async function Page() {
  const [albums, photos] = await Promise.all([
    prisma.album.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.photo.findMany({ orderBy: { takenAt: 'desc' }, include: { album: true } }),
  ]);
  return <GalleryAdmin albums={JSON.parse(JSON.stringify(albums))} photos={JSON.parse(JSON.stringify(photos))} />;
}
