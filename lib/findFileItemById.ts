import { FileItem } from '@/models/fileItem';

export default function findFileItemById(
  items: FileItem[],
  id: string,
): FileItem | null {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }

    const foundInChildren =
      item.children != undefined ? findFileItemById(item.children!, id) : null;
    if (foundInChildren) {
      return foundInChildren;
    }
  }

  return null;
}
