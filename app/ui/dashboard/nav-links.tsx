import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
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

export default function NavLinks({ id }) {
  return (
    <>
      {links.map((link) => {
        // const LinkIcon = link.icon;

        return (
          <Link
            key={link.name}
            href={{
              pathname: `/courses/${id}/${link.videoId}`,
              // query: { video: `${link.videoId}` },
            }}
            className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
          >
            {/* <LinkIcon className="w-6" /> */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
