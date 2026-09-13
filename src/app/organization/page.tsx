export const metadata = { title: 'Struktur Organisasi' };
export default function OrgPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="text-3xl md:text-4xl font-bold">Struktur Organisasi</h1>
      <div className="mt-10 p-8 rounded-2xl border border-border bg-surface text-center">
        <div className="font-bold">KETUA KELAS</div>
        <div className="text-accent text-sm">Nama Siswa 01</div>
        <div className="my-3">↓</div>
        <div className="font-bold">WAKIL KETUA</div>
        <div className="text-accent text-sm">Nama Siswa 02</div>
      </div>
    </div>
  );
}
