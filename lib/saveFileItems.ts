import fs from 'fs';
import { DB_NAME } from './constants';
import { FileItem } from '@/models/fileItem';

export default function saveFileItems(items: FileItem[]) {
  fs.writeFileSync(DB_NAME, JSON.stringify(items, null, 2), 'utf-8');
}
