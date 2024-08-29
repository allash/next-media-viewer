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
          <SideNav />

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
