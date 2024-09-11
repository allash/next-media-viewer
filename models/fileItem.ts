export interface FileItem {
  id: string;
  name: string;
  type: string;
  path?: string;
  timestamp?: number;
  percentage?: number;
  children?: FileItem[];
}
