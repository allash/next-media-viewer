import { NextResponse } from 'next/server';

export async function POST(request: Request, context: any) {
  const { timestamp } = await request.json();
  console.log(timestamp);

  return NextResponse.json(timestamp);
}
