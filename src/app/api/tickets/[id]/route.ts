import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  if (!token) return null;
  try {
    const decoded = verifyToken(token);
    return decoded.role === 'ADMIN' ? decoded : null;
  } catch {
    return null;
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  if (status !== 'PENDING' && status !== 'RESOLVED') {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const ticket = await prisma.ticket.update({ where: { id }, data: { status } });
    return NextResponse.json({ ticket }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.ticket.delete({ where: { id } });
    return NextResponse.json({ message: 'Ticket deleted' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
  }
}
