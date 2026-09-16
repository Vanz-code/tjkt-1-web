import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(600px circle at 20% 20%, rgba(34,211,238,.15), transparent 60%), radial-gradient(700px circle at 80% 40%, rgba(96,165,250,.12), transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface/70 text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Kelas Aktif • 2025/2026
          </span>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              TJKT 1
            </span>
          </h1>

          <p className="mt-3 text-lg md:text-xl text-muted">
            Teknik Jaringan Komputer dan Telekomunikasi
          </p>
          <p className="mt-1 text-sm md:text-base font-mono text-cyan-400">
            Connect • Create • Collaborate
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/gallery"
              className="inline-flex items-center h-11 px-5 rounded-lg bg-cyan-400 text-black font-medium hover:opacity-90 transition"
            >
              Lihat Dokumentasi
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center h-11 px-5 rounded-lg border border-border bg-surface hover:bg-surface/70 transition"
            >
              Tentang Kelas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
