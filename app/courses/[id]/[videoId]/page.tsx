'use client';

import VideoPlayer from '@/app/ui/components/VideoPlayer';
import { FileItem } from '@/models/fileItem';
import React, { useEffect } from 'react';

export default function VideoPage({
  params,
}: {
  params: { id: string; videoId: string };
}) {
  const [data, setData] = React.useState<FileItem | null>(null);
  const { videoId } = params;

  useEffect(() => {
    fetch(`/api/media/${videoId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (data == null) return null;

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-gray-700">
        {data.name.replace(/\.[^/.]+$/, '')}
      </h1>
      <div className="mt-10">
        <VideoPlayer item={data} />
      </div>
    </>
  );
}
