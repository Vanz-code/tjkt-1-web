'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.ok) router.push('/admin');
    else setErr('Email atau password salah.');
  }

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold">Login Admin</h1>
      <p className="text-muted text-sm mt-1">Hanya untuk pengurus kelas.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface border border-border outline-none text-sm" />
        <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface border border-border outline-none text-sm" />
        {err && <p className="text-sm text-red-500">{err}</p>}
        <button type="submit" disabled={loading} className="w-full h-10 rounded-lg bg-accent text-black font-medium disabled:opacity-50">
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
      <p className="text-xs text-muted mt-6">Default: admin@tjkt1.local / Admin123!</p>
    </div>
  );
}
