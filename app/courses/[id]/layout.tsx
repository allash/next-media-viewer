import '@/app/ui/global.css';
import { FileItem } from '@/models/fileItem';
import findFileItems from '@/lib/findFileItems';
import findFileItemById from '@/lib/findFileItemById';
import Sidebar from '@/app/ui/dashboard/Sidebar';

export default function CourseDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const fileItems: FileItem[] = findFileItems();
  const fileItem = findFileItemById(fileItems, params.id);

  const { id } = params;

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          id={id}
          name={fileItem?.name}
          fileItems={fileItem?.children!}
        />

        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="p-12">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
