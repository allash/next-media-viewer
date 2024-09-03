import '@/app/ui/global.css';
import Sidebar from '@/app/ui/dashboard/sidebar';
import path from 'path';
import fs from 'fs';

export interface Item {
  id: string;
  name: string;
  type: string;
  path?: string;
  children?: Item[];
}

function getAllFilesAndDirectories(dirPath: string): Item[] {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  return items.map((item): Item => {
    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      return {
        id: 'test-directory',
        name: item.name,
        type: 'directory',
        children: getAllFilesAndDirectories(fullPath),
      };
    } else {
      return {
        id: 'tsst-file',
        path: fullPath,
        name: item.name,
        type: 'file',
      };
    }
  });
}

const renderStructure = (items: Item[]) => {
  items.map((item, index) => {
    if (item.type == 'directory') {
      // console.log('-' + item.name);
      renderStructure(item.children!);
    } else {
      // console.log(item.name);
    }
  });
};

function findById(items: Item[], id: string): Item | null {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
  }

  return null;
}

export default function CourseDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const data: Item[] = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  const media = findById(data, params.id);
  const dirPath = path.join(process.cwd(), media?.path!);
  const items = getAllFilesAndDirectories(dirPath);

  renderStructure(items);

  const { id } = params;

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar id={id} items={items} />

        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="p-12">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
