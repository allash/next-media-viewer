import { Item } from '@/models/item';

export default function updateById(
  items: Item[],
  id: string,
  updatedItem: Item,
): boolean {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      items[i] = { ...items[i], ...updatedItem };
      return true;
    }

    if (items[i].children && items[i].children!.length > 0) {
      const found = updateById(items[i].children!, id, updatedItem);
      if (found) return true;
    }
  }
  return false;
}
