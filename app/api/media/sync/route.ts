import fs from 'fs';
import getAllFilesAndDirectories from '@/lib/getAllFilesAndDirectories';
import { NextRequest, NextResponse } from 'next/server';
import { Item } from '@/models/item';

const dbName = 'db.json';

export async function PUT(request: NextRequest, context: any) {
  let mediaFileNames: string[] = await request.json();

  const items: Item[] = getAllFilesAndDirectories('public/collections');
  for (let i = 0; i < items.length; i++) {
    if (!mediaFileNames.includes(items[i].name)) {
      items.splice(i, 1);
    }
  }

  fs.writeFileSync(dbName, JSON.stringify(items, null, 2), 'utf-8');

  return NextResponse.json('');
}
