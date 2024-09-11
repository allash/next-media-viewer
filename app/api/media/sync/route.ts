import { NextRequest, NextResponse } from 'next/server';
import findAllFilesAndDirectories from '@/lib/findAllFilesAndDirectories';
import { FileItem } from '@/models/fileItem';
import saveFileItems from '@/lib/saveFileItems';
import { MEDIA_COLLECTIONS_FILE_PATH } from '@/lib/constants';

export async function PUT(request: NextRequest) {
  let mediaFileNames: string[] = await request.json();

  let items: FileItem[] = findAllFilesAndDirectories(
    MEDIA_COLLECTIONS_FILE_PATH,
  );
  let filteredItems = items.filter((item) =>
    mediaFileNames.includes(item.name),
  );

  saveFileItems(filteredItems);

  return NextResponse.json({});
}
