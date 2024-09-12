'use client';

import { FileItem } from '@/models/fileItem';
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useAppContext } from './AppContextProvider';

type VideoPlayerProps = {
  fileItem: FileItem;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ fileItem }) => {
  const { updateFileItemProgress } = useAppContext();

  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const playerRef = React.useRef<any>();
  const onReady = React.useCallback(() => {
    if (!isReady) {
      if (playerRef.current != undefined) {
        playerRef.current.seekTo(fileItem.timestamp || 0, 'seconds');
        setIsReady(true);
      }
    }
  }, [isReady]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const updateVideoProgress = async (
      timestamp: number,
      percentage: number,
    ) => {
      try {
        await fetch(`/api/media/${fileItem.id}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ timestamp, percentage }),
        });
      } catch (error) {
        console.log('Error sending timestamp: ', timestamp);
      } finally {
        updateFileItemProgress(fileItem.id, percentage);
      }
    };

    if (isPlaying) {
      interval = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          const percentage = (currentTime * 100) / duration;
          updateVideoProgress(currentTime, Math.floor(percentage));
        }
      }, 1000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, fileItem.id]);

  if (!isMounted) return null;

  const videoSrc = fileItem.path;
  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        width={'100%'}
        height={'100%'}
        url={videoSrc}
        controls={true}
        light={false}
        pip={true}
        playing={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onStart={() => setIsPlaying(false)}
        onReady={onReady}
        // onSeek={(e) => console.log('onSeek', e)}
      />
      <source src={videoSrc} type="video/mp4" />
    </div>
  );
};

export default VideoPlayer;
