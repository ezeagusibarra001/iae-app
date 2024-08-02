export const maxDuration = 60
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    await prisma.contact.deleteMany({});

    await prisma.contact.createMany({
      data,
    });

    return NextResponse.json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
