import NavLinks from '@/app/ui/dashboard/nav-links';
import { FileItem } from '@/models/fileItem';
import Link from 'next/link';
import React from 'react';

type SidebarProps = {
  id: string;
  fileItems: FileItem[];
};

const Sidebar: React.FC<SidebarProps> = ({ id, fileItems }) => {
  return (
    <div className="hidden w-96 flex-col bg-gray-100 md:flex">
      <div className="flex h-16 items-center justify-center bg-gray-300 ">
        <Link href={'/'} className="font-bold uppercase text-gray-700">
          MediaViewer
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 bg-gray-200 px-2 py-4">
          <NavLinks id={id} fileItems={fileItems} />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
