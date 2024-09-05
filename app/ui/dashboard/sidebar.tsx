import NavLinks, { ItemProps } from '@/app/ui/dashboard/nav-links';
import React from 'react';

const Sidebar: React.FC<ItemProps> = ({ id, items }) => {
  return (
    <div className="hidden w-96 flex-col bg-gray-800 md:flex">
      <div className="flex h-16 items-center justify-center bg-gray-900">
        <span className="font-bold uppercase text-white">MediaViewer</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 bg-gray-800 px-2 py-4">
          <NavLinks id={id} items={items} />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
