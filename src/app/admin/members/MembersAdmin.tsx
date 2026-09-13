'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type M = { id: string; name: string; position?: string | null; attendanceNumber?: number | null; photo?: string | null; bio?: string | null; division?: string | null; orderIndex: number };

export function MembersAdmin({ initial }: { initial: M[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<M | null>(null);
  const [form, setForm] = useState<Partial<M>>({});

  const startCreate = () => { setEditing(null); setForm({ orderIndex: initial.length }); setOpen(true); };
  const startEdit = (m: M) => { setEditing(m); setForm(m); setOpen(true); };

  const save = async () => {
    const url = editing ? `/api/admin/members/${editing.id}` : '/api/admin/members';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (!res.ok) { alert('GAGAL SIMPAN!'); return; }
    setOpen(false); router.refresh();
  };

  const del = async (id: string) => {
    if (!confirm('Hapus?')) return;
    await fetch(`/api/admin/members/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Members</h1>
        <button onClick={startCreate} className="h-10 px-4 rounded-lg bg-accent text-black text-sm font-medium">+ Tambah</button>
      </div>
      <div className="mt-6 rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface text-muted">
            <tr><th className="text-left p-3">No</th><th className="text-left p-3">Nama</th><th className="text-left p-3">Jabatan</th><th className="text-right p-3">Aksi</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {initial.map((m) => (
              <tr key={m.id}>
                <td className="p-3">{String(m.attendanceNumber ?? 0).padStart(2, '0')}</td>
                <td className="p-3">{m.name}</td>
                <td className="p-3 text-muted">{m.position}</td>
                <td className="p-3 text-right space-x-2">
                  <button onClick={() => startEdit(m)} className="text-accent hover:underline">Edit</button>
                  <button onClick={() => del(m.id)} className="text-red-400 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold mb-3">{editing ? 'Edit' : 'Tambah'} Anggota</h3>
            <div className="space-y-3">
              <input placeholder="Nama" value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <input placeholder="Jabatan" value={form.position ?? ''} onChange={(e) => setForm({ ...form, position: e.target.value })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
              <input type="number" placeholder="No. Absen" value={form.attendanceNumber ?? ''} onChange={(e) => setForm({ ...form, attendanceNumber: Number(e.target.value) })} className="w-full h-10 px-3 rounded-lg bg-bg border border-border outline-none text-sm" />
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
