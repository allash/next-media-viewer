import findFiles from '@/lib/findFiles';
import { FileInfo } from '@/models/fileInfo';
import { NextRequest, NextResponse } from 'next/server';

const ignoredFiles = ['.DS_Store', '.gitkeep'];

export async function GET(request: NextRequest) {
  const items: FileInfo[] = findFiles('public/collections').filter(
    (e) => !ignoredFiles.includes(e.name),
  );

  return NextResponse.json(items);
}
