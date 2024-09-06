import { NextResponse } from 'next/server';
import fs from 'fs';
import { Item } from '@/models/item';
import findById from '@/lib/findById';

export async function GET(request: Request, context: any) {
  const { params } = context;

  const items: Item[] = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  const item = findById(items, params.id);

  return NextResponse.json(item);
}
