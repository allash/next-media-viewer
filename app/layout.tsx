import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import SideNav from './ui/dashboard/sidenav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-screen bg-gray-100">
          <div className="hidden w-64 flex-col bg-gray-800 md:flex">
            <div className="flex h-16 items-center justify-center bg-gray-900">
              <span className="font-bold uppercase text-white">
                MediaViewer
              </span>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 bg-gray-800 px-2 py-4">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
                >
                  Media 1
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
                >
                  Media 2
                </a>
              </nav>
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="p-12">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
