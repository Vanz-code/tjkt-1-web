export const metadata = { title: 'Tentang Kelas' };
export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Tentang TJKT 1</h1>
      <p className="text-muted mt-2">Profil dan identitas kelas.</p>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-semibold mb-3">Identitas Kelas</h2>
          <dl className="text-sm space-y-2">
            <div className="flex justify-between border-b border-border pb-2"><dt className="text-muted">Nama Kelas</dt><dd>TJKT 1</dd></div>
            <div className="flex justify-between border-b border-border pb-2"><dt className="text-muted">Jurusan</dt><dd>TJKT</dd></div>
            <div className="flex justify-between border-b border-border pb-2"><dt className="text-muted">Sekolah</dt><dd>SMK Negeri 1</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Tahun</dt><dd>2025/2026</dd></div>
          </dl>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-semibold mb-3">Visi</h2>
          <p className="text-sm text-muted">Menjadi kelas unggul dalam jaringan komputer.</p>
        </div>
      </div>
    </div>
  );
}
