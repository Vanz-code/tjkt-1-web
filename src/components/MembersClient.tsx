'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { FadeIn } from './FadeIn';

type Member = {
  id: string;
  name: string;
  position?: string | null;
  attendanceNumber?: number | null;
  photo?: string | null;
  division?: string | null;
};

export function MembersClient({ initial }: { initial: Member[] }) {
  const [q, setQ] = useState('');
  const [role, setRole] = useState('all');

  const roles = useMemo(
    () => ['all', ...Array.from(new Set(initial.map((m) => m.position || 'Anggota')))],
    [initial]
  );

  const list = useMemo(() => {
    const k = q.toLowerCase().trim();
    return initial.filter((m) => {
      const matchQ =
        !k ||
        m.name.toLowerCase().includes(k) ||
        String(m.attendanceNumber ?? '').includes(k);
      const matchR = role === 'all' || (m.position || 'Anggota') === role;
      return matchQ && matchR;
    });
  }, [initial, q, role]);

  return (
    <>
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <div className="relative flex-1">
          <input
            placeholder="Cari nama atau nomor absen..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full h-10 pl-10 pr-3 rounded-lg bg-surface border border-border outline-none text-sm focus:border-cyan-400 transition"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">
            🔍
          </span>
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full sm:w-56 h-10 px-3 rounded-lg bg-surface border border-border outline-none text-sm"
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r === 'all' ? 'Semua Jabatan' : r}
            </option>
          ))}
        </select>
      </div>

      {/* Result */}
      <div className="mt-8">
        {list.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {list.map((m, i) => (
              <FadeIn key={m.id} delay={i * 0.03}>
                <div className="group rounded-2xl border border-border bg-surface overflow-hidden hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[4/5] relative bg-gradient-to-br from-surface to-bg overflow-hidden">
                    <Image
                      src={m.photo || '/placeholder/student.svg'}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="font-semibold truncate">{m.name}</div>
                    <div className="text-sm text-cyan-400 truncate">
                      {m.position || 'Anggota'}
                    </div>
                    <div className="mt-1 text-xs text-muted">
                      No. Absen {String(m.attendanceNumber ?? 0).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-10 text-center">
            <div className="text-3xl mb-2">🔎</div>
            <div className="font-semibold">Tidak ada anggota ditemukan</div>
            <p className="text-sm text-muted mt-1">
              Coba ubah kata kunci atau filter.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
