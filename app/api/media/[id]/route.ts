import { NextResponse } from 'next/server';
import fs from 'fs';
import { Item } from '@/models/item';

function findByIdRecursive(items: Item[], id: string): Item | null {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }

    const foundInChildren =
      item.children != undefined ? findByIdRecursive(item.children!, id) : null;
    if (foundInChildren) {
      return foundInChildren;
    }
  }

  return null;
}

export async function GET(request: Request, context: any) {
  const { params } = context;

  const items: Item[] = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  const item = findByIdRecursive(items, params.id);

  return NextResponse.json(item);
}
