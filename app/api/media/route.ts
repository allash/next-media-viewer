import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';

const dbName = 'db.json';

export async function GET(request: NextRequest, response: NextResponse) {
  if (!fs.existsSync(dbName)) {
    return NextResponse.json([]);
  }
  const items = JSON.parse(fs.readFileSync(dbName, 'utf-8'));
  return NextResponse.json(items);
}
