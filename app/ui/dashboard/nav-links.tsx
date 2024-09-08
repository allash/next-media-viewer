'use client';

import { Item } from '@/models/item';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';

import { useSelectedLayoutSegment } from 'next/navigation';

export interface ItemProps {
  id: string;
  items: Item[];
}

const NavLinks: React.FC<ItemProps> = (props) => {
  const activeSegment = useSelectedLayoutSegment();

  const { id, items } = props;
  const renderStructure = (items: Item[], depth = 0): JSX.Element => (
    <>
      {items.map((item, idx) => (
        <div key={idx}>
          {item.type == 'directory' ? (
            <>
              <p
                key={idx}
                className="flex items-center px-4 py-2 text-gray-800"
                style={{ paddingLeft: `${depth * 20}px` }}
              >
                <FontAwesomeIcon icon={faFolder} className="text-yellow-500" />
                <span className="pl-2">{item.name}</span>
              </p>
              {renderStructure(item.children!, depth + 1)}
            </>
          ) : (
            <Link
              key={idx}
              href={{
                pathname: `/courses/${id}/${item.id}`,
              }}
              className={`flex items-center px-4 py-2 text-gray-800 hover:bg-gray-300 ${
                activeSegment == item.id ? 'bg-gray-300' : null
              }`}
              style={{ paddingLeft: `${depth * 20}px` }}
            >
              <p className="hidden md:block">
                <FontAwesomeIcon
                  icon={faPhotoVideo}
                  className="text-blue-400"
                />
                <span className="pl-2">
                  {item.name.replace(/\.[^/.]+$/, '')}
                </span>
              </p>
            </Link>
          )}
        </div>
      ))}
    </>
  );

  return <>{renderStructure(items)}</>;
};

export default NavLinks;
