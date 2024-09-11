import { FileItem } from '@/models/fileItem';
import saveFileItems from './saveFileItems';

function updateFileItem(
  items: FileItem[],
  id: string,
  updatedItem: FileItem,
): boolean {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      items[i] = { ...items[i], ...updatedItem };
      return true;
    }

    if (items[i].children && items[i].children!.length > 0) {
      const found = updateFileItem(items[i].children!, id, updatedItem);
      if (found) return true;
    }
  }
  return false;
}

export default function updateFileItemById(
  items: FileItem[],
  id: string,
  updatedItem: FileItem,
) {
  updateFileItem(items, id, updatedItem);
  saveFileItems(items);
}
