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
        setSyncCourses(data);
      });
  }, []);

  const handleSync = () => {
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (courseId: string) => {
    setSyncCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, isChecked: !course.isChecked }
          : course,
      ),
    );
  };

  const handleSave = () => {
    const selectedCourses = syncCourses.filter((course) => course.isChecked);

    console.log('Selected Courses for Sync:', selectedCourses);
    setCourses(selectedCourses);
    setIsModalOpen(false);
  };

  const handleDelete = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Courses</h1>

        <button
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleSync}
        >
          Sync
        </button>

        <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="px-4 py-2">
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900 flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-blue-700 hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80"
                  >
                    {course.name}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
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
                    <tr key={course.id} className="border-t">
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={course.isChecked}
                          onChange={() => handleCheckboxChange(course.id)}
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
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
