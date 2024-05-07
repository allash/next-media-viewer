import VideoPlayer from './ui/components/VideoPlayer';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1>Video Player App</h1>
      <VideoPlayer />
    </main>
  );
}
