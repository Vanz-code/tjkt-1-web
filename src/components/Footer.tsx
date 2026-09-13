import Link from 'next/link';
export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-semibold">TJKT 1</div>
          <p className="text-sm text-muted mt-1">Teknik Jaringan Komputer dan Telekomunikasi</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Navigasi</h4>
          <ul className="text-sm text-muted space-y-1">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/members">Members</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/projects">Projects</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Kontak</h4>
          <p className="text-sm text-muted">tjkt1@example.sch.id</p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} TJKT 1 — Digital Class Hub
      </div>
    </footer>
  );
}
