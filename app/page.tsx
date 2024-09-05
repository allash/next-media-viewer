import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '@/models/item';

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

export default async function CoursesPage() {
  const json = JSON.stringify(
    getAllFilesAndDirectories('public/collections'),
    null,
    2,
  );

  const dbName = 'db.json';
  if (!fs.existsSync(dbName)) {
    fs.writeFileSync(dbName, json, 'utf-8');
  }

  const data = JSON.parse(fs.readFileSync(dbName, 'utf-8'));

  return (
    <>
      <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <nav className="text-blue-gray-700 flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal">
          {data.map((c: Item) => (
            <Link
              key={c.id}
              href={`/courses/${c.id}`}
              className="hover:bg-blue-gray-50 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900 flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
