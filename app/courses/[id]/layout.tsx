'use client';

import '@/app/ui/global.css';
import Sidebar from '@/app/ui/dashboard/Sidebar';
import { useEffect } from 'react';
import { useAppContext } from '@/app/ui/components/AppContextProvider';

export default function CourseDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  const { fetchItemById, fileItem } = useAppContext();

  useEffect(() => {
    fetchItemById(id);
  }, [id]);

  if (fileItem == null) return null;

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
