'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';

import { useSelectedLayoutSegment } from 'next/navigation';
import { FileItem } from '@/models/fileItem';
import removeFileExtension from '@/lib/helpers/removeFileExtension';
import ProgressCircle from '../components/ProgressCircle';

type NavLinksProps = {
  id: string;
  fileItems: FileItem[];
};

const NavLinks: React.FC<NavLinksProps> = ({ id, fileItems }) => {
  const activeSegment = useSelectedLayoutSegment();

  const renderStructure = (fileItems: FileItem[], depth = 0): JSX.Element => (
    <>
      {fileItems.map((item, idx) => (
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
              className={`flex items-center px-4 py-2 text-gray-800 hover:bg-slate-50 ${
                activeSegment == item.id ? 'bg-slate-50' : null
              }`}
              style={{ paddingLeft: `${depth * 20}px` }}
            >
              <div className="relative pt-1">
                <ProgressCircle progress={item.percentage} />
              </div>
              <FontAwesomeIcon
                icon={faPhotoVideo}
                className="ml-2 text-blue-400"
              />
              <span className="pl-2">{removeFileExtension(item.name)}</span>
            </Link>
          )}
        </div>
      ))}
    </>
  );

  return <>{renderStructure(fileItems)}</>;
};

export default NavLinks;
