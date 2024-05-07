'use client';
import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);
  const playerRef = React.useRef();

  const onReady = React.useCallback(() => {
    if (!isReady) {
      const timeToStart = 7 * 60 + 12.6;
      playerRef.current.seekTo(timeToStart, 'seconds');
      setIsReady(true);
    }
  }, [isReady]);

  let videoSrc = `/collections/demo.mp4`;

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
