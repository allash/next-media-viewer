import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '@/models/item';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

function getAllFilesAndDirectories(dirPath: string): Item[] {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  return items.map((item): Item => {
    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      return {
        id: uuidv4(),
        name: item.name,
        path: fullPath,
        type: 'directory',
        children: getAllFilesAndDirectories(fullPath),
      };
    } else {
      return {
        id: uuidv4(),
        name: item.name,
        path: fullPath,
        type: 'file',
      };
    }
  });
}

export async function GET(request: NextRequest, response: NextResponse) {
  const json = JSON.stringify(
    getAllFilesAndDirectories('public/collections'),
    null,
    2,
  );
  const dbName = 'db.json';
  if (!fs.existsSync(dbName)) {
    fs.writeFileSync(dbName, json, 'utf-8');
  }
  const items = JSON.parse(fs.readFileSync(dbName, 'utf-8'));
  return NextResponse.json(items);
}
