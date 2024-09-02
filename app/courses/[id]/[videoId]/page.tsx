import VideoPlayer from '@/app/ui/components/VideoPlayer';

export default function VideoPage({ params }: { params: { videoId: string } }) {
  const { videoId } = params;
  return (
    <>
      <div>Video page: {videoId} </div>
      <div>
        <VideoPlayer />
      </div>
    </>
  );
}
