import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BYTES = 8 * 1024 * 1024;

export async function saveUpload(file: File) {
  if (!ALLOWED.includes(file.type)) throw new Error('Tipe file tidak diizinkan.');
  if (file.size > MAX_BYTES) throw new Error('Ukuran file melebihi 8MB.');
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
  const name = `${crypto.randomBytes(12).toString('hex')}.${ext}`;
  const dir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(dir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, name), bytes);
  return `/uploads/${name}`;
}
