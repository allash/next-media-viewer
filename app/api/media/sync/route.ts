import fs from 'fs';
import getAllFilesAndDirectories from '@/lib/getAllFilesAndDirectories';
import { NextRequest, NextResponse } from 'next/server';
import { Item } from '@/models/item';

const dbName = 'db.json';

export async function PUT(request: NextRequest, context: any) {
  let mediaFileNames: string[] = await request.json();

  let items: Item[] = getAllFilesAndDirectories('public/collections');
  let filteredItems = items.filter((item) =>
    mediaFileNames.includes(item.name),
  );

  fs.writeFileSync(dbName, JSON.stringify(filteredItems, null, 2), 'utf-8');

  return NextResponse.json('');
}
