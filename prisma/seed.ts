import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@tjkt1.local';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'Admin123!';
  const name = process.env.SEED_ADMIN_NAME ?? 'Admin TJKT 1';

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name, role: 'ADMIN', password: await bcrypt.hash(password, 10) },
  });

  const settings: Record<string, string> = {
    class_name: 'TJKT 1',
    class_major: 'Teknik Jaringan Komputer dan Telekomunikasi',
    school: 'SMK Negeri 1 Contoh',
    academic_year: '2025/2026',
    homeroom_teacher: 'Nama Wali Kelas',
    vision: 'Menjadi kelas yang unggul dalam bidang jaringan komputer, berkarakter, dan berdaya saing global.',
    mission: JSON.stringify([
      'Meningkatkan kompetensi jaringan komputer & telekomunikasi.',
      'Membangun budaya kolaborasi dan disiplin.',
      'Mengembangkan project nyata berbasis teknologi.',
      'Menjaga akhlak dan kekompakan kelas.',
    ]),
  };
  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }

  const members = Array.from({ length: 12 }).map((_, i) => ({
    name: `Nama Siswa ${String(i + 1).padStart(2, '0')}`,
    position: i === 0 ? 'Ketua Kelas' : i === 1 ? 'Wakil Ketua' : i === 2 ? 'Sekretaris' : i === 3 ? 'Bendahara' : 'Anggota',
    attendanceNumber: i + 1,
    photo: `/placeholder/student.svg`,
    bio: 'Siswa TJKT 1.',
    division: i < 4 ? 'PENGURUS INTI' : 'ANGGOTA',
    orderIndex: i,
  }));
  for (const m of members) {
    const exists = await prisma.member.findFirst({ where: { attendanceNumber: m.attendanceNumber } });
    if (!exists) await prisma.member.create({ data: m });
  }

  if ((await prisma.announcement.count()) === 0) {
    await prisma.announcement.createMany({
      data: [
        { title: 'Pengumpulan Tugas Jaringan Komputer', content: 'Kumpulkan tugas konfigurasi VLAN paling lambat 15 September 2026.', category: 'Assignment', author: 'Guru TJKT' },
        { title: 'Persiapan Class Meeting', content: 'Latihan rutin setiap Jumat pukul 15.00.', category: 'Event', author: 'Ketua Kelas' },
        { title: 'Aturan Baru Praktik Lab', content: 'Wajib membawa toolset pribadi saat praktik.', category: 'Important', author: 'Wali Kelas' },
      ],
    });
  }

  if ((await prisma.event.count()) === 0) {
    const now = new Date();
    const plus = (d: number) => new Date(now.getTime() + d * 86400000);
    await prisma.event.createMany({
      data: [
        { title: 'Praktik Jaringan', description: 'Konfigurasi router & switch.', date: plus(2), time: '08:00', location: 'Lab TJKT', status: 'upcoming' },
        { title: 'Presentasi Project AI', description: 'Presentasi prototype project KKA.', date: plus(7), time: '10:00', location: 'Ruang Multimedia', status: 'upcoming' },
        { title: 'Class Meeting', description: 'Turnamen futsal antar kelas.', date: plus(14), time: '13:00', location: 'Lapangan', status: 'upcoming' },
      ],
    });
  }

  const albumsSeed = [
    { title: 'MPLS', slug: 'mpls', description: 'Masa Pengenalan Lingkungan Sekolah.' },
    { title: 'Praktik TJKT', slug: 'praktik-tjkt', description: 'Kegiatan praktik di lab.' },
    { title: 'Class Meeting', slug: 'class-meeting', description: 'Turnamen dan event kelas.' },
    { title: 'Random Moments', slug: 'random-moments', description: 'Momen random kelas.' },
  ];
  for (const a of albumsSeed) {
    await prisma.album.upsert({
      where: { slug: a.slug },
      update: {},
      create: { ...a, coverUrl: '/placeholder/gallery.svg' },
    });
  }

  const albums = await prisma.album.findMany();
  if ((await prisma.photo.count()) === 0) {
    for (const album of albums) {
      for (let i = 0; i < 6; i++) {
        await prisma.photo.create({
          data: {
            albumId: album.id,
            fileUrl: '/placeholder/gallery.svg',
            caption: `Dokumentasi ${album.title} #${i + 1}`,
            takenAt: new Date(),
          },
        });
      }
    }
  }

  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({
      data: [
        { title: 'Smart Attendance', description: 'Absensi otomatis berbasis RFID.', author: 'Nama Siswa 01', technologies: 'Arduino, RFID, Node.js', status: 'completed', image: '/placeholder/project.svg' },
        { title: 'Monitoring Suhu Server', description: 'IoT monitoring suhu ruang server.', author: 'Nama Siswa 02', technologies: 'ESP32, MQTT, Grafana', status: 'in-progress', image: '/placeholder/project.svg' },
        { title: 'Chatbot Kelas', description: 'Chatbot informasi kelas berbasis AI.', author: 'Nama Siswa 03', technologies: 'Next.js, OpenAI', status: 'in-progress', image: '/placeholder/project.svg' },
      ],
    });
  }

  console.log('✅ Seed selesai. Login admin pakai:', email);
}

main().finally(() => prisma.$disconnect());
