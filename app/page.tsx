'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ScanFilesModal from './ui/components/ScanFilesModal';
import { ScanItem } from '@/models/scanItem';

export default function CoursesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<ScanItem[]>([]);
  const [syncCourses, setSyncCourses] = useState<ScanItem[]>([]);

  useEffect(() => {
    fetch(`/api/media`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  const handleSync = () => {
    fetch(`/api/media/scan`)
      .then((res) => res.json())
      .then((data: ScanItem[]) => {
        for (let i = 0; i < data.length; i++) {
          if (courses.some((e) => e.name == data[i].name)) {
            data[i].isChecked = true;
          }
        }

        setSyncCourses(data);

        setIsModalOpen(true);
      });
  };

  const handleCheckboxChange = (courseName: string) => {
    setSyncCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.name === courseName
          ? { ...course, isChecked: !course.isChecked }
          : course,
      ),
    );
  };

  const handleSave = () => {
    const selectedCourses = syncCourses.filter((course) => course.isChecked);

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedCourses.map((e) => e.name)),
    };

    fetch('/api/media/sync', requestOptions)
      .then((res) => res.json())
      .then(() => {
        console.log('Data synced');

        fetch(`/api/media`)
          .then((res) => res.json())
          .then((data) => {
            setCourses(data);
          });
      });

    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="mb-4 text-2xl font-bold text-gray-700">MediaViewer</h1>

          <button
            className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
            onClick={handleSync}
          >
            Scan
          </button>
        </div>

        <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="px-4 py-2">
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="focus:bg-blue-gray-50 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900 flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-gray-100 hover:bg-opacity-80 hover:text-gray-700 focus:bg-opacity-80 active:bg-opacity-80"
                  >
                    {course.name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <ScanFilesModal
            syncCourses={syncCourses}
            handleCheckboxChange={handleCheckboxChange}
            handleSave={handleSave}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </>
  );
}
