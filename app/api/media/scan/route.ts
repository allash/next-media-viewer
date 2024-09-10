import findFiles from '@/lib/findFiles';
import { FileInfo } from '@/models/fileInfo';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const ignoredFiles = ['.DS_Store', '.gitkeep'];

export async function GET(request: NextRequest) {
  const collectionsDir = path.join(process.cwd(), 'public', 'collections');
  const items: FileInfo[] = findFiles(collectionsDir).filter(
    (e) => !ignoredFiles.includes(e.name),
  );
  return NextResponse.json(items);
}
