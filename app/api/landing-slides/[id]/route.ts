
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { getToken } from 'next-auth/jwt';


type Params = { params: { id: string } };


// const secret = process.env.NEXTAUTH_SECRET;

// async function isAuthenticated(req: Request) {
//   const token = await getToken({ req, secret });
//   if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// }

export async function GET(_: Request, { params }: Params) {
  const slide = await prisma.landingPageSlide.findUnique({ where: { id: params.id } });
  if (!slide) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(slide);
}

export async function PUT(req: Request, { params }: Params) {
  const data = await req.json();
  try {
    const updated = await prisma.landingPageSlide.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.landingPageSlide.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
