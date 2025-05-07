import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const cases = await prisma.case.findMany({
      include: {
        files: true,
        people: true,
      },
    });
    return NextResponse.json(cases);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, summary, context, status } = body;

    if (!title || !summary || !context) {
      return NextResponse.json({ error: 'Title, summary and context are required' }, { status: 400 });
    }

    const newCase = await prisma.case.create({
      data: {
        title,
        summary,
        context,
        status: status || 'ativo',
      },
    });

    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 });
  }
} 