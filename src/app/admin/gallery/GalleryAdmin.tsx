'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Album = { id: string; title: string; slug: string };
type Photo = { id: string; albumId: string; fileUrl: string; caption?: string | null };

export function GalleryAdmin({ albums, photos }: { albums: Album[]; photos: Photo[] }) {
  const router = useRouter();
  const [albumOpen, setAlbumOpen] = useState(false);
  const [albumForm, setAlbumForm] = useState<Partial<Album>>({});
  const [photoOpen, setPhotoOpen] = useState(false);
  const [photoForm, setPhotoForm] = useState<Partial<Photo>>({});
  const [uploading, setUploading] = useState(false);

  const createAlbum = async () => {
    const res = await fetch('/api/admin/albums', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(albumForm) });
    if (!res.ok) return alert('GAGAL!');
    setAlbumOpen(false); setAlbumForm({}); router.refresh();
  };

  const delAlbum = async (id: string) => {
    if (!confirm('Hapus album + semua fotonya?')) return;
    await fetch(`/api/admin/albums/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    setUploading(false);
    if (!res.ok) { alert('UPLOAD GAGAL!'); return null; }
    const { url } = await res.json();
    return url;
  };

  const createPhoto = async () => {
    const res = await fetch('/api/admin/photos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(photoForm) });
    if (!res.ok) return alert('GAGAL!');
    setPhotoOpen(false); setPhotoForm({}); router.refresh();
  };

  const delPhoto = async (id: string) => {
    if (!confirm('Hapus foto?')) return;
    await fetch(`/api/admin/photos/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <div className="flex gap-2">
          <button onClick={() => setAlbumOpen(true)} className="h-10 px-4 rounded-lg border border-border text-sm">+ Album</button>
          <button onClick={() => setPhotoOpen(true)} disabled={!albums.length} className="h-10 px-4 rounded-lg bg-accent text-black text-sm font-medium disabled:opacity-50">+ Foto</button>
        </div>
      </div>
      <h2 className="mt-8 font-semibold">Album ({albums.length})</h2>
      <div className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {albums.map((a) => (
          <div key={a.id} className="rounded-xl border border-border bg-surface p-4 flex justify-between items-center">
            <div><div className="font-medium">{a.title}</div><div className="text-xs text-muted">{a.slug}</div></div>
            <button onClick={() => delAlbum(a.id)} className="text-red-400 text-sm">Hapus</button>
          </div>
        ))}
      </div>
      <h2 className="mt-10 font-semibold">Foto ({photos.length})</h2>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {photos.map((p) => (
          <div key={p.id} className="group relative aspect-square rounded-xl overflow-hidden border border-border">
            <Image src={p.fileUrl} alt={p.caption ?? ''} fill sizes="25vw" className="object-cover" />
            <button onClick={() => delPhoto(p.id)} className="absolute top-2 right-2 bg-red-500/90 text-white text-[10px] px-2 py-1 rounded">Hapus</button>
          </div>
        ))}
      </div>
      {albumOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setAlbumOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold mb-3">Tambah Album</h3>
            <div className="space-y-3">
              <input placeholder="Judul Album" value={albumForm.title ?? ''} onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setAlbumOpen(false)} className="h-10 px-4 rounded-lg border border-border text-sm">Batal</button>
                <button onClick={createAlbum} className="h-10 px-4 rounded-lg bg-accent text-black text-sm font-medium">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {photoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setPhotoOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold mb-3">Tambah Foto</h3>
            <div className="space-y-3">
              <select value={photoForm.albumId ?? ''} onChange={(e) => setPhotoForm({ ...photoForm, albumId: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm">
                <option value="">-- Pilih Album --</option>
                {albums.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
              </select>
              <input type="file" accept="image/*" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; const url = await uploadFile(f); if (url) setPhotoForm((p) => ({ ...p, fileUrl: url })); }} className="w-full text-sm" />
              {uploading && <div className="text-xs text-accent">Mengunggah...</div>}
              {photoForm.fileUrl && <div className="text-xs text-accent">URL: {photoForm.fileUrl}</div>}
              <input placeholder="Caption" value={photoForm.caption ?? ''} onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setPhotoOpen(false)} className="h-10 px-4 rounded-lg border border-border text-sm">Batal</button>
                <button onClick={createPhoto} disabled={uploading || !photoForm.albumId || !photoForm.fileUrl} className="h-10 px-4 rounded-lg bg-accent text-black text-sm font-medium disabled:opacity-50">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
