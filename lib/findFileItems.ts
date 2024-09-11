import fs from 'fs';
import { DB_NAME } from './constants';
import { FileItem } from '@/models/fileItem';

export default function findFileItems(): FileItem[] {
  if (!fs.existsSync(DB_NAME)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(DB_NAME, 'utf-8'));
}
