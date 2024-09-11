import { NextResponse } from 'next/server';
import findFileItems from '@/lib/findFileItems';
import { FileItem } from '@/models/fileItem';
import updateFileItemById from '@/lib/updateFileItemById';
import findFileItemById from '@/lib/findFileItemById';

export async function POST(request: Request, context: any) {
  const { params } = context;
  const { timestamp } = await request.json();

  const items: FileItem[] = findFileItems();
  const item = findFileItemById(items, params.id);
  if (item != null) {
    item.timestamp = timestamp;
    updateFileItemById(items, params.id, item);
  }

  return NextResponse.json(timestamp);
}
