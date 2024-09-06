import { Item } from '@/models/item';

export default function findById(items: Item[], id: string): Item | null {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }

    const foundInChildren =
      item.children != undefined ? findById(item.children!, id) : null;
    if (foundInChildren) {
      return foundInChildren;
    }
  }

  return null;
}
