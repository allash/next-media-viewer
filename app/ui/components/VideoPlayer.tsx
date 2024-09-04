'use client';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Item } from '@/app/courses/[id]/layout';

export interface VideoProps {
  id: string;
  videoId: string;
}

const VideoPlayer: React.FC<VideoProps> = (videoParams) => {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const [videoSrc, setVideoSrc] = React.useState<Item | null>(null);

  const playerRef = React.useRef();
  const { id, videoId } = videoParams;
  const onReady = React.useCallback(() => {
    if (!isReady) {
      const timeToStart = 27 * 60 + 12.6;
      playerRef.current.seekTo(timeToStart, 'seconds');
      setIsReady(true);
    }
  }, [isReady]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetch(`/api/media/${videoId}`)
      .then((res) => res.json())
      .then((data) => {
        setVideoSrc(data.path.replace('public', ''));
      });
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        width={500}
        height={400}
        url={videoSrc}
        controls={true}
        light={false}
        pip={true}
        onReady={onReady}
        onSeek={(e) => console.log('onSeek', e)}
      />
      <source src={videoSrc} type="video/mp4" />
    </div>
  );
};

export default VideoPlayer;
