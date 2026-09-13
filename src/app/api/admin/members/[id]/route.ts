import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function guard() {
  const s = await getServerSession(authOptions);
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const g = await guard(); if (g) return g;
  const data = await req.json();
  return NextResponse.json(await prisma.member.update({ where: { id: params.id }, data }));
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const g = await guard(); if (g) return g;
  await prisma.member.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
