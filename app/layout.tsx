import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 bg-gray-800">
          {/* Sidebar content */}
          <div className="p-4">
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
            {/* Sidebar links */}
            <ul className="mt-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Collection 1
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Collection 2
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Collection 3
                </a>
              </li>
              {/* Add more sidebar links as needed */}
            </ul>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          {/* Page content */}
          {children}
        </div>
      </div>
    </html>
  );
}
