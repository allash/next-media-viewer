import VideoPlayer from '@/app/ui/components/VideoPlayer';

export default function VideoPage({
  params,
}: {
  params: { id: string; videoId: string };
}) {
  const { id, videoId } = params;
  return (
    <>
      <div>Video page: {videoId} </div>
      <div>
        <VideoPlayer id={id} videoId={videoId} />
      </div>
    </>
  );
}
