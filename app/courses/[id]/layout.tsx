import '@/app/ui/global.css';
import Sidebar from '@/app/ui/dashboard/sidebar';
import path from 'path';
import fs from 'fs';

export interface Item {
  name: string;
  type: string;
  children?: Item[];
}

function getAllFilesAndDirectories(dirPath: string): Item[] {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  return items.map((item): Item => {
    const fullPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      return {
        name: item.name,
        type: 'directory',
        children: getAllFilesAndDirectories(fullPath),
      };
    } else {
      return {
        name: item.name,
        type: 'file',
      };
    }
  });
}

const renderStructure = (items: Item[]) => {
  items.map((item, index) => {
    if (item.type == 'directory') {
      console.log('-' + item.name);
      renderStructure(item.children!);
    } else {
      console.log(item.name);
    }
  });
};

export default function CourseDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const dirPath = path.join(process.cwd(), 'public/collections/Super course 2');
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
