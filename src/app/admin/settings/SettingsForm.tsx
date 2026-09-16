'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SettingsForm({ initial }: { initial: Record<string, string> }) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const update = (k: string, v: string) => setData({ ...data, [k]: v });

  const save = async () => {
    setSaving(true);
    setMsg('');
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMsg(res.ok ? 'Tersimpan!' : 'GAGAL SIMPAN!');
    if (res.ok) router.refresh();
  };

  const mission: string[] = data.mission ? JSON.parse(data.mission) : [];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-muted text-sm mt-1">Ubah informasi kelas.</p>
      <div className="mt-6 space-y-3">
        <input placeholder="Nama Kelas" value={data.class_name ?? ''} onChange={(e) => update('class_name', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface border border-border outline-none text-sm" />
        <input placeholder="Jurusan" value={data.class_major ?? ''} onChange={(e) => update('class_major', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface border border-border outline-none text-sm" />
        <input placeholder="Sekolah" value={data.school ?? ''} onChange={(e) => update('school', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface border border-border outline-none text-sm" />
        <input placeholder="Tahun Ajaran" value={data.academic_year ?? ''} onChange={(e) => update('academic_year', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface border border-border outline-none text-sm" />
        <input placeholder="Wali Kelas" value={data.homeroom_teacher ?? ''} onChange={(e) => update('homeroom_teacher', e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface border border-border outline-none text-sm" />
        <textarea placeholder="Visi" value={data.vision ?? ''} onChange={(e) => update('vision', e.target.value)} className="w-full min-h-[100px] p-3 rounded-lg bg-surface border border-border outline-none text-sm" />
        <div>
          <label className="text-xs text-muted">Misi (satu per baris)</label>
          <textarea value={mission.join('\n')} onChange={(e) => update('mission', JSON.stringify(e.target.value.split('\n').filter(Boolean)))} className="w-full min-h-[120px] p-3 rounded-lg bg-surface border border-border outline-none text-sm" />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={save} disabled={saving} className="h-10 px-4 rounded-lg bg-accent text-black text-sm font-medium disabled:opacity-50">
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          {msg && <span className="text-sm text-accent">{msg}</span>}
        </div>
      </div>
    </div>
  );
}
