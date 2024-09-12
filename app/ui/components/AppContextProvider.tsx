import { FileItem } from '@/models/fileItem';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type AppContextType = {
  fileItem?: FileItem;
  fetchItemById: (id: string) => void;
  updateFileItemProgress: (id: string, percentage: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useVideoContext must be used within provider!');
  }
  return context;
};

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fileItem, setFileItem] = useState<FileItem>();

  const fetchItemById = async (id: string) => {
    try {
      const response = await fetch(`/api/media/${id}`);
      const data = await response.json();
      setFileItem(data);
    } catch (err) {
      console.error(`Failed to fetch item by id ${id}`);
    }
  };

  const updateFileItemProgress = (id: string, percentage: number) => {
    fileItem!.children = updateFileProgress(
      fileItem?.children!,
      id,
      percentage,
    );
    setFileItem({ ...fileItem });
  };

  const updateFileProgress = (
    files: FileItem[],
    id: string,
    percentage: number,
  ): FileItem[] => {
    return files.map((file) => {
      if (file.id === id) {
        return { ...file, percentage };
      } else if (file.children) {
        return {
          ...file,
          children: updateFileProgress(file.children, id, percentage),
        };
      }
      return file;
    });
  };

  return (
    <AppContext.Provider
      value={{ fileItem, fetchItemById, updateFileItemProgress }}
    >
      {children}
    </AppContext.Provider>
  );
};
