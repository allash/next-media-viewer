export default function removeFileExtension(name: string): string {
  return name.replace(/\.[^/.]+$/, '');
}
