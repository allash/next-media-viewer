import { ScanItem } from '@/models/scanItem';

type ScanFilesModalProps = {
  syncCourses: ScanItem[];
  handleCheckboxChange: (name: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  handleSave: () => void;
};

const ScanFilesModal: React.FC<ScanFilesModalProps> = ({
  syncCourses,
  handleCheckboxChange,
  setIsModalOpen,
  handleSave,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Sync Media Files</h2>

        <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Select</th>
              <th className="px-4 py-2 text-left">Name</th>
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
  );
};

export default ScanFilesModal;
