import { NextResponse } from 'next/server';
import findFileItems from '@/lib/findFileItems';
import { FileItem } from '@/models/fileItem';
import findFileItemById from '@/lib/findFileItemById';

export async function GET(request: Request, context: any) {
  const { params } = context;

  const items: FileItem[] = findFileItems();
  const item = findFileItemById(items, params.id);

  return NextResponse.json(item);
}
