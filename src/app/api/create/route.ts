import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Contact } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data: Contact[] = await request.json();

    await prisma.contact.createMany({
      data,
    });

    return NextResponse.json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
