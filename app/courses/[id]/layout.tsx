import '@/app/ui/global.css';
import Sidebar from '@/app/ui/dashboard/sidebar';
import fs from 'fs';

export interface Item {
  id: string;
  name: string;
  type: string;
  path?: string;
  children?: Item[];
}

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

  const { id } = params;

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar id={id} items={media?.children!} />

        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="p-12">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
