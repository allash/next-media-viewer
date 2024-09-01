import '@/app/ui/global.css';
import SideNav from '@/app/ui/dashboard/sidenav';

export default function CourseDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <SideNav id={id} />

        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="p-12">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
