import fs from 'fs';
import { FileInfo } from '@/models/fileInfo';

export default function findFiles(dirPath: string): FileInfo[] {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  return items.map((item): FileInfo => {
    if (item.isDirectory()) {
      return {
        name: item.name,
        type: 'directory',
      };
    } else {
      return {
        name: item.name,
        type: 'file',
      };
    }
  });
}
