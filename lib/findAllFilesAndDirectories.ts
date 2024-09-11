import { FileItem } from '@/models/fileItem';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const videoFormats = [
  'mp4',
  'mov',
  'avi',
  'mkv',
  'flv',
  'wmv',
  'webm',
  'mpeg',
  '3gp',
];

function isVideoFile(file: string): boolean {
  const fileExtension = file.split('.').pop()?.toLowerCase();
  return fileExtension != undefined && videoFormats.includes(fileExtension);
}

export default function findAllFilesAndDirectories(
  dirPath: string,
): FileItem[] {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  const result: FileItem[] = [];

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      result.push({
        id: uuidv4(),
        name: file.name,
        path: fullPath,
        type: 'directory',
        children: findAllFilesAndDirectories(fullPath),
      });
    } else if (file.isFile() && isVideoFile(file.name)) {
      result.push({
        id: uuidv4(),
        name: file.name,
        path: fullPath,
        type: 'file',
      });
    }
  });

  return result;
}
