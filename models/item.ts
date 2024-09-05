export interface Item {
  id: string;
  name: string;
  type: string;
  path?: string;
  children?: Item[];
}
