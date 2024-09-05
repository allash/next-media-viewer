'use client';

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Item } from '@/models/item';
export interface VideoProps {
  item: Item;
}

const VideoPlayer: React.FC<VideoProps> = (props) => {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const playerRef = React.useRef();
  const { item } = props;
  const onReady = React.useCallback(() => {
    if (!isReady) {
      const timeToStart = 7 * 60 + 12.6;
      playerRef.current.seekTo(timeToStart, 'seconds');
      setIsReady(true);
    }
  }, [isReady]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const videoSrc = item.path.replace('public', '');
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
