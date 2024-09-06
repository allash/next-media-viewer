export interface Item {
  id: string;
  name: string;
  type: string;
  path?: string;
  timestamp?: number;
  children?: Item[];
}
