import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '@/models/item';

export default function getAllFilesAndDirectories(dirPath: string): Item[] {
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
