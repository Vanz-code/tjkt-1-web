'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type E = { id: string; title: string; description?: string | null; date: string; time?: string | null; location?: string | null; status: string };

export function AgendaAdmin({ initial }: { initial: E[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<E | null>(null);
  const [form, setForm] = useState<Partial<E>>({ status: 'upcoming' });

  const startCreate = () => { setEditing(null); setForm({ status: 'upcoming' }); setOpen(true); };
  const startEdit = (e: E) => { setEditing(e); setForm({ ...e, date: e.date.slice(0, 10) }); setOpen(true); };

  const save = async () => {
    const url = editing ? `/api/admin/events/${editing.id}` : '/api/admin/events';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (!res.ok) { alert('GAGAL!'); return; }
    setOpen(false); router.refresh();
  };

  const del = async (id: string) => {
    if (!confirm('Hapus?')) return;
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Agenda</h1>
        <button onClick={startCreate} className="h-10 px-4 rounded-lg bg-accent text-black text-sm font-medium">+ Tambah</button>
      </div>
      <div className="mt-6 space-y-2">
        {initial.map((e) => (
          <div key={e.id} className="rounded-xl border border-border bg-surface p-4 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded border border-border text-muted">{e.status}</span>
                <span className="text-xs text-muted">{new Date(e.date).toLocaleDateString('id-ID')} · {e.time}</span>
              </div>
              <div className="font-medium mt-1">{e.title}</div>
              <div className="text-xs text-muted">{e.location}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(e)} className="text-accent hover:underline text-sm">Edit</button>
              <button onClick={() => del(e.id)} className="text-red-400 hover:underline text-sm">Hapus</button>
            </div>
          </div>
        ))}
        {!initial.length && <div className="p-6 text-center text-muted border border-dashed border-border rounded-xl">Belum ada agenda.</div>}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold mb-3">{editing ? 'Edit' : 'Tambah'} Agenda</h3>
            <div className="space-y-3">
              <input placeholder="Judul" value={form.title ?? ''} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <input placeholder="Deskripsi" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <input type="date" value={form.date ?? ''} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <input placeholder="Jam (08:00)" value={form.time ?? ''} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <input placeholder="Lokasi" value={form.location ?? ''} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <select value={form.status ?? 'upcoming'} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm">
                <option value="upcoming">Upcoming</option><option value="ongoing">Ongoing</option><option value="done">Done</option>
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
