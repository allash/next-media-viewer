import Link from 'next/link';
import path from 'path';
import fs from 'fs';

async function loadCourses() {
  const dirPath = path.join(process.cwd(), 'public/collections');
  const directories = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      const fullPath = path.join(dirPath, dirent.name);
      const stat = fs.statSync(fullPath);
      return { name: dirent.name, ctime: stat.ctime };
    });

  directories.sort((a, b) => a.ctime - b.ctime);

  let courses = [];
  for (var i = 0; i < directories.length; i++) {
    courses.push({ id: i + 1, name: directories[i].name });
  }
  return courses;
}

export default async function CoursesPage() {
  const courses = await loadCourses();

  return (
    <>
      <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <nav className="text-blue-gray-700 flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal">
          {courses.map((c) => (
            <Link
              key={c.id}
              href={`/courses/${c.id}`}
              className="hover:bg-blue-gray-50 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900 flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
