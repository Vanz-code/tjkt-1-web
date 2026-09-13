import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function guard() {
  const s = await getServerSession(authOptions);
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const g = await guard(); if (g) return g;
  await prisma.photo.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
