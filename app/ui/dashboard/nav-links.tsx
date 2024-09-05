import { Item } from '@/models/item';
import Link from 'next/link';

export interface ItemProps {
  id: string;
  items: Item[];
}

const NavLinks: React.FC<ItemProps> = ({ id, items }) => {
  const renderStructure = (items: Item[]): JSX.Element => (
    <>
      {items.map((item, idx) => (
        <div key={idx}>
          {item.type == 'directory' ? (
            <>
              <p
                key={idx}
                className="flex items-center px-4 py-2 text-blue-600"
              >
                {item.name}
              </p>
              {renderStructure(item.children!)}
            </>
          ) : (
            <Link
              key={idx}
              href={{
                pathname: `/courses/${id}/${item.id}`,
              }}
              className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
            >
              <p className="hidden md:block">{item.name}</p>
            </Link>
          )}
        </div>
      ))}
    </>
  );

  return <>{renderStructure(items)}</>;
};

export default NavLinks;
