'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SyncItem {
  id: string;
  name: string;
  isChecked: boolean;
}

export default function CoursesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<SyncItem[]>([]);
  const [syncCourses, setSyncCourses] = useState<SyncItem[]>([]);

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
      .then((data: SyncItem[]) => {
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

    console.log('Selected Courses for Sync:', selectedCourses);

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
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Sync Courses</h2>

              <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Select</th>
                    <th className="px-4 py-2 text-left">Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {syncCourses.map((course) => (
                    <tr key={course.name} className="border-t">
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={course.isChecked || false}
                          onChange={() => handleCheckboxChange(course.name)}
                        />
                      </td>
                      <td className="px-4 py-2">{course.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex justify-end">
                <button
                  className="mr-2 rounded bg-gray-500 px-4 py-2 text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                  onClick={handleSave}
                >
                  Sync
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
