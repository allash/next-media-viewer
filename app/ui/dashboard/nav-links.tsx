import { Item } from '@/app/courses/[id]/layout';
import Link from 'next/link';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
// const links = [
//   { name: 'Home', href: '/dashboard', icon: HomeIcon },
//   {
//     name: 'Invoices',
//     href: '/dashboard/invoices',
//     icon: DocumentDuplicateIcon,
//   },
//   { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
// ];

const links = [
  { name: 'Video 1', videoId: 'a' },
  { name: 'Video 2', videoId: 'b' },
  { name: 'Video 3', videoId: 'c' },
];

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
                pathname: `/courses/${id}/${item.name}`,
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
