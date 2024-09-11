import findFileItems from '@/lib/findFileItems';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(findFileItems());
}
