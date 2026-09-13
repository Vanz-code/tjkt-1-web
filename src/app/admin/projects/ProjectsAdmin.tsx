'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type P = { id: string; title: string; description: string; author: string; technologies: string; image?: string | null; demoUrl?: string | null; repositoryUrl?: string | null; status: string };

export function ProjectsAdmin({ initial }: { initial: P[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<P | null>(null);
  const [form, setForm] = useState<Partial<P>>({ status: 'in-progress' });

  const startCreate = () => { setEditing(null); setForm({ status: 'in-progress' }); setOpen(true); };
  const startEdit = (p: P) => { setEditing(p); setForm(p); setOpen(true); };

  const save = async () => {
    const url = editing ? `/api/admin/projects/${editing.id}` : '/api/admin/projects';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (!res.ok) { alert('GAGAL!'); return; }
    setOpen(false); router.refresh();
  };

  const del = async (id: string) => {
    if (!confirm('Hapus?')) return;
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={startCreate} className="h-10 px-4 rounded-lg bg-accent text-black text-sm font-medium">+ Tambah</button>
      </div>
      <div className="mt-6 space-y-2">
        {initial.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-surface p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded border border-border text-muted">{p.status}</span>
                <span className="text-xs text-muted">oleh {p.author}</span>
              </div>
              <div className="font-medium mt-1 truncate">{p.title}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="text-accent hover:underline text-sm">Edit</button>
              <button onClick={() => del(p.id)} className="text-red-400 hover:underline text-sm">Hapus</button>
            </div>
          </div>
        ))}
        {!initial.length && <div className="p-6 text-center text-muted border border-dashed border-border rounded-xl">Belum ada project.</div>}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-surface p-5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3">{editing ? 'Edit' : 'Tambah'} Project</h3>
            <div className="space-y-3">
              <input placeholder="Judul" value={form.title ?? ''} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <textarea placeholder="Deskripsi" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full min-h-[100px] p-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <input placeholder="Author" value={form.author ?? ''} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <input placeholder="Teknologi (koma)" value={form.technologies ?? ''} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <select value={form.status ?? 'in-progress'} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm">
                <option value="in-progress">In Progress</option><option value="completed">Completed</option>
              </select>
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
