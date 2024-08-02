import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = await request.json();

    await prisma.contact.deleteMany({});

    const chunkSize = 1000;
    const dataChunks = chunkArray(data, chunkSize);
    console.log(dataChunks)
    const promises = dataChunks.map(chunk =>
      fetch(`${request.nextUrl.origin}/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chunk),
      })
    );

    await Promise.all(promises);

    return NextResponse.json({ message: 'Data deleted and insertion triggered successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
