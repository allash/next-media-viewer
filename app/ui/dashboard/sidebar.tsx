import { FileItem } from '@/models/fileItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import React from 'react';
import NavLinks from './NavLinks';

type SidebarProps = {
  id: string;
  name: string | undefined;
  fileItems: FileItem[];
};

const Sidebar: React.FC<SidebarProps> = ({ id, name, fileItems }) => {
  return (
    <div className="hidden w-2/12 flex-col bg-gray-100 md:flex">
      <div className="flex h-16 items-center justify-start bg-gray-300 ">
        <Link href={'/'} className="font-bold uppercase text-gray-700">
          <FontAwesomeIcon
            icon={faHome}
            size="lg"
            className="pl-4 text-gray-700"
          />
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto bg-gray-200">
        <div className="align-items flex h-64 justify-center border-b border-b-gray-300 pb-5 pt-5 font-bold text-gray-600">
          {name}
        </div>
        <nav className="flex-grow px-2 py-2">
          <NavLinks id={id} fileItems={fileItems} />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
