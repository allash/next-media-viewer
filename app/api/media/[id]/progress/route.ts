import { NextResponse } from 'next/server';
import findById from '@/lib/findById';
import findFileItems from '@/lib/findFileItems';
import { FileItem } from '@/models/fileItem';
import updateFileItemById from '@/lib/updateFileItemById';
import saveFileItems from '@/lib/saveFileItems';

export async function POST(request: Request, context: any) {
  const { params } = context;
  const { timestamp } = await request.json();

  const items: FileItem[] = findFileItems();
  const item = findById(items, params.id);
  if (item != null) {
    item.timestamp = timestamp;
    updateFileItemById(items, params.id, item);
    saveFileItems(items);
  }

  return NextResponse.json(timestamp);
}
