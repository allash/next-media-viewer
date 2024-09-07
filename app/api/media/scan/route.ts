import findFiles from '@/lib/findFiles';
import { FileInfo } from '@/models/fileInfo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const items: FileInfo[] = findFiles('public/collections');

  return NextResponse.json(items);
}
