import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function guard() {
  const s = await getServerSession(authOptions);
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

export async function GET() {
  const g = await guard(); if (g) return g;
  return NextResponse.json(await prisma.project.findMany({ orderBy: { createdAt: 'desc' } }));
}

export async function POST(req: Request) {
  const g = await guard(); if (g) return g;
  const data = await req.json();
  return NextResponse.json(await prisma.project.create({ data }), { status: 201 });
}
