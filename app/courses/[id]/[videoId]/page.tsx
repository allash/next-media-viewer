'use client';

import VideoPlayer from '@/app/ui/components/VideoPlayer';
import removeFileExtension from '@/lib/helpers/removeFileExtension';
import { FileItem } from '@/models/fileItem';
import React, { useEffect } from 'react';

export default function VideoPage({
  params,
}: {
  params: { id: string; videoId: string };
}) {
  const [fileItem, setFileItem] = React.useState<FileItem | null>(null);
  const { videoId } = params;

  useEffect(() => {
    fetch(`/api/media/${videoId}`)
      .then((res) => res.json())
      .then((data) => {
        setFileItem(data);
      });
  }, []);

  if (fileItem == null) return null;

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-gray-700">
        {removeFileExtension(fileItem.name)}
      </h1>
      <div className="mt-10">
        <VideoPlayer fileItem={fileItem} />
      </div>
    </>
  );
}
