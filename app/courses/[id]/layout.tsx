import '@/app/ui/global.css';
import Sidebar from '@/app/ui/dashboard/sidebar';
import findById from '@/lib/findById';
import { FileItem } from '@/models/fileItem';
import findFileItems from '@/lib/findFileItems';

export default function CourseDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const items: FileItem[] = findFileItems();
  const item = findById(items, params.id);

  const { id } = params;

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar id={id} items={item?.children!} />

        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="p-12">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
