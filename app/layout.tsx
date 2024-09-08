import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-screen bg-gray-100">
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
