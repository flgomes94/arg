import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const caseId = searchParams.get('caseId');
    const role = searchParams.get('role');

    let whereClause = {};
    
    if (caseId) {
      whereClause = { ...whereClause, caseId };
    }
    
    if (role) {
      whereClause = { ...whereClause, role };
    }

    const people = await prisma.person.findMany({
      where: whereClause,
    });
    return NextResponse.json(people);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch people' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { caseId, name, role, description, image } = body;

    if (!caseId || !name || !role || !description) {
      return NextResponse.json(
        { error: 'CaseId, name, role and description are required' },
        { status: 400 }
      );
    }

    const person = await prisma.person.create({
      data: {
        caseId,
        name,
        role,
        description,
        image,
      },
    });

    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create person' }, { status: 500 });
  }
} 