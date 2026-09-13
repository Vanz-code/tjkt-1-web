import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';

async function guard() {
  const s = await getServerSession(authOptions);
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

export async function GET() {
  const g = await guard(); if (g) return g;
  return NextResponse.json(await prisma.album.findMany({ orderBy: { createdAt: 'desc' } }));
}

export async function POST(req: Request) {
  const g = await guard(); if (g) return g;
  const body = await req.json();
  const slug = slugify(body.title) + '-' + Math.random().toString(36).slice(2, 6);
  return NextResponse.json(await prisma.album.create({ data: { ...body, slug } }), { status: 201 });
}
