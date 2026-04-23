import React, { useMemo } from "react";
import { Maximize } from "lucide-react";

interface YouTubePlayerProps {
  videoUrl: string;
  onTimeUpdate?: (time: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  className?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoUrl,
  onTimeUpdate,
  onPlay,
  onPause,
  onEnded,
  className = "",
}) => {
  // YouTube video ID ni olish
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = useMemo(() => getYouTubeVideoId(videoUrl), [videoUrl]);

  const handleFullscreenToggle = () => {
    const iframe = document.querySelector(
      'iframe[src*="youtube.com"]'
    ) as HTMLIFrameElement;
    if (iframe) {
      if (!document.fullscreenElement) {
        iframe.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  if (!videoId) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center bg-gray-800 text-white ${className}`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-lg">Noto'g'ri YouTube URL</p>
          <p className="text-sm opacity-80">
            Iltimos, to'g'ri YouTube video linkini kiriting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}&rel=0&modestbranding=1&showinfo=0&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0&controls=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; camera; microphone; magnetometer"
        allowFullScreen
      ></iframe>

      {/* Overlay controls - faqat ko'rinish uchun */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={handleFullscreenToggle}
          className="p-2 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70"
          title="Fullscreen"
        >
          <Maximize size={16} />
        </button>
      </div>
    </div>
  );
};

export default YouTubePlayer;
