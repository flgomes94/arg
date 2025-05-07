import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const caseId = searchParams.get('caseId');

    if (caseId) {
      const files = await prisma.file.findMany({
        where: {
          caseId,
        },
      });
      return NextResponse.json(files);
    }

    const files = await prisma.file.findMany();
    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { caseId, type, title, description, content, availableAt } = body;

    if (!caseId || !type || !title || !content) {
      return NextResponse.json(
        { error: 'CaseId, type, title and content are required' },
        { status: 400 }
      );
    }

    const file = await prisma.file.create({
      data: {
        caseId,
        type,
        title,
        description,
        content,
        availableAt: availableAt ? new Date(availableAt) : new Date(),
      },
    });

    return NextResponse.json(file, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create file' }, { status: 500 });
  }
} 