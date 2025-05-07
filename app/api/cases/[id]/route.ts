import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const caseData = await prisma.case.findUnique({
      where: { id },
      include: {
        files: true,
        people: true,
      },
    });

    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    return NextResponse.json(caseData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch case' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { title, summary, context, status } = body;

    const updatedCase = await prisma.case.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(summary && { summary }),
        ...(context && { context }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updatedCase);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update case' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Primeiro, excluímos todos os arquivos e pessoas relacionados
    await prisma.file.deleteMany({
      where: { caseId: id },
    });

    await prisma.person.deleteMany({
      where: { caseId: id },
    });

    // Então, excluímos o caso
    await prisma.case.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Case deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete case' }, { status: 500 });
  }
} 