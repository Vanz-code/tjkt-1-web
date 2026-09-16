'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Lightbox } from './Lightbox';
import { FadeIn } from './FadeIn';

type Album = { id: string; title: string };
type Photo = { id: string; albumId: string; fileUrl: string; caption?: string | null; takenAt: string };

export function GalleryGrid({ albums, photos }: { albums: Album[]; photos: Photo[] }) {
  const [album, setAlbum] = useState('all');
  const [lb, setLb] = useState<number | null>(null);

  const list = useMemo(() => {
    return album === 'all' ? photos : photos.filter((p) => p.albumId === album);
  }, [photos, album]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <select
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          className="w-full sm:w-64 h-10 px-3 rounded-lg bg-surface border border-border outline-none text-sm"
        >
          <option value="all">Semua Album</option>
          {albums.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        {list.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {list.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.03}>
                <button
                  onClick={() => setLb(i)}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-border hover:border-cyan-400 transition-all duration-300 w-full"
                >
                  <Image
                    src={p.fileUrl}
                    alt={p.caption ?? ''}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity text-left">
                    {p.caption}
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-10 text-center">
            <div className="text-3xl mb-2">📷</div>
            <div className="font-semibold">Belum ada dokumentasi</div>
            <p className="text-sm text-muted mt-1">Dokumentasi kelas akan muncul di sini.</p>
          </div>
        )}
      </div>

      {lb !== null && (
        <Lightbox photos={list} index={lb} onClose={() => setLb(null)} onNav={setLb} />
      )}
    </>
  );
}
