import { NextResponse } from 'next/server';
import findById from '@/lib/findById';
import findFileItems from '@/lib/findFileItems';
import { FileItem } from '@/models/fileItem';

export async function GET(request: Request, context: any) {
  const { params } = context;

  const items: FileItem[] = findFileItems();
  const item = findById(items, params.id);

  return NextResponse.json(item);
}
