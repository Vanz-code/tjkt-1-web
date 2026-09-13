'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type A = { id: string; title: string; content: string; category: string; author?: string | null; status: string; publishedAt: string };

export function AnnouncementsAdmin({ initial }: { initial: A[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<A | null>(null);
  const [form, setForm] = useState<Partial<A>>({ category: 'General', status: 'published' });

  const startCreate = () => { setEditing(null); setForm({ category: 'General', status: 'published' }); setOpen(true); };
  const startEdit = (a: A) => { setEditing(a); setForm(a); setOpen(true); };

  const save = async () => {
    const url = editing ? `/api/admin/announcements/${editing.id}` : '/api/admin/announcements';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (!res.ok) { alert('GAGAL SIMPAN!'); return; }
    setOpen(false); router.refresh();
  };

  const del = async (id: string) => {
    if (!confirm('Hapus?')) return;
    await fetch(`/api/admin/announcements/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <button onClick={startCreate} className="h-10 px-4 rounded-lg bg-accent text-black text-sm font-medium">+ Tambah</button>
      </div>
      <div className="mt-6 space-y-3">
        {initial.map((a) => (
          <div key={a.id} className="rounded-xl border border-border bg-surface p-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded border border-border text-muted">{a.category}</span>
                <span className="text-xs text-muted">{new Date(a.publishedAt).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="font-medium mt-1">{a.title}</div>
              <div className="text-sm text-muted line-clamp-2 mt-1">{a.content}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(a)} className="text-accent hover:underline text-sm">Edit</button>
              <button onClick={() => del(a.id)} className="text-red-400 hover:underline text-sm">Hapus</button>
            </div>
          </div>
        ))}
        {!initial.length && <div className="p-6 text-center text-muted border border-dashed border-border rounded-xl">Belum ada pengumuman.</div>}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-surface p-5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3">{editing ? 'Edit' : 'Tambah'} Pengumuman</h3>
            <div className="space-y-3">
              <input placeholder="Judul" value={form.title ?? ''} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <textarea placeholder="Isi" value={form.content ?? ''} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full min-h-[120px] p-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <select value={form.category ?? 'General'} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm">
                <option>General</option><option>Important</option><option>Assignment</option><option>Event</option>
              </select>
              <input placeholder="Author" value={form.author ?? ''} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <div className="flex gap-2 justify-end pt-2">
                <button onClick={() => setOpen(false)} className="h-10 px-4 rounded-lg border border-border text-sm">Batal</button>
                <button onClick={save} className="h-10 px-4 rounded-lg bg-accent text-black text-sm font-medium">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
