import { NextResponse } from 'next/server';
import fs from 'fs';
import { Item } from '@/models/item';
import findById from '@/lib/findById';
import updateById from '@/lib/updateById';

const dbName = 'db.json';

export async function POST(request: Request, context: any) {
  const { params } = context;
  const { timestamp } = await request.json();

  const items: Item[] = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  const item = findById(items, params.id);
  if (item != null) {
    item.timestamp = timestamp;
    updateById(items, params.id, item);
    if (fs.existsSync(dbName)) {
      fs.writeFileSync(dbName, JSON.stringify(items, null, 2), 'utf-8');
      console.log(`Item ${params.id} updated with timestamp ${timestamp}`);
    }
  }

  return NextResponse.json(timestamp);
}
