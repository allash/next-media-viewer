import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col">
          {/* Header */}
          <header className="flex items-center justify-between bg-gray-800 px-4 py-2">
            {/* Logo placeholder */}
            <div className="text-lg font-semibold text-white">Logo</div>

            {/* "Add collection" button */}
            <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Rescan
            </button>
          </header>

          {/* Main content */}
          <div className="flex flex-1">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 bg-gray-800">
              {/* Sidebar content */}
              <div className="p-4">
                <h1 className="text-lg font-semibold text-white">
                  Collections
                </h1>
                {/* Sidebar links */}
                <ul className="mt-4">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Link 3
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
        </div>
      </body>
    </html>
  );
}
