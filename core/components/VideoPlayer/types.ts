export interface VideoPlayerProps {
  autoPlay?: boolean;
  poster?: string;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: number;
  height?: number;
  src: string;
}
