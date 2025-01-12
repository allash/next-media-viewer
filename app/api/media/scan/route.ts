import { MEDIA_COLLECTIONS_FILE_PATH } from '@/lib/constants';
import findFileInfos from '@/lib/findFileInfos';
import { FileInfo } from '@/models/fileInfo';
import { NextResponse } from 'next/server';
import path from 'path';

const ignoredFiles = ['.DS_Store', '.gitkeep'];

export async function GET() {
  const collectionsDir = path.join(process.cwd(), MEDIA_COLLECTIONS_FILE_PATH);
  const items: FileInfo[] = findFileInfos(collectionsDir).filter(
    (e) => !ignoredFiles.includes(e.name),
  );
  return NextResponse.json(items);
}
