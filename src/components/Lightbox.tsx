'use client';
import { useEffect } from 'react';
import Image from 'next/image';

type Photo = { id: string; fileUrl: string; caption?: string | null; takenAt: string };

export function Lightbox({
  photos,
  index,
  onClose,
  onNav,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const p = photos[index];

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav((index + 1) % photos.length);
      if (e.key === 'ArrowLeft') onNav((index - 1 + photos.length) % photos.length);
    };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [index, photos.length, onClose, onNav]);

  if (!p) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 text-white/80" onClick={(e) => e.stopPropagation()}>
        <div className="text-sm">
          {index + 1} / {photos.length}
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-lg hover:bg-white/10 grid place-items-center text-2xl"
          aria-label="Tutup"
        >
          ✕
        </button>
      </div>

      {/* Image */}
      <div className="relative flex-1 mx-3 mb-3" onClick={(e) => e.stopPropagation()}>
        <Image
          src={p.fileUrl}
          alt={p.caption ?? ''}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Caption */}
      <div className="pb-4 text-center text-white/90 px-6" onClick={(e) => e.stopPropagation()}>
        {p.caption && <div className="text-sm">{p.caption}</div>}
        <div className="text-xs text-white/60 mt-1">
          {new Date(p.takenAt).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </div>

      {/* Nav buttons */}
      <button
        aria-label="Sebelumnya"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index - 1 + photos.length) % photos.length);
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 text-2xl"
      >
        ‹
      </button>
      <button
        aria-label="Berikutnya"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index + 1) % photos.length);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20 text-2xl"
      >
        ›
      </button>
    </div>
  );
}
