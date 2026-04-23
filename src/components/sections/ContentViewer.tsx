import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  FastForward,
  Rewind,
  Maximize,
  Video,
  Folder,
  Box,
  Presentation,
  Camera,
  ChevronLeft,
  PlayCircle,
  PauseCircle,
} from "lucide-react";
import ThreeDAnimation from "./ThreeDAnimation";
import ExercisePolygon from "./ExercisePolygon";
import YouTubePlayer from "./YouTubePlayer";
import { ProductProcessContent } from "../../data/mockProductProcess";

interface ContentViewerProps {
  content: ProductProcessContent;
  onTimeUpdate: (time: number) => void;
  currentTime: number;
  showExercise: boolean;
  onExerciseClose: () => void;
  isCCActive: boolean;
  subtitleMode: string;
  currentPosition: string;
  onPositionChange: (position: string) => void;
}

// Helper function to check if URL is YouTube
const isYouTubeUrl = (url: string): boolean => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

const ContentViewer: React.FC<ContentViewerProps> = ({
  content,
  onTimeUpdate,
  currentTime,
  showExercise,
  onExerciseClose,
  isCCActive,
  subtitleMode,
  currentPosition,
  onPositionChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showCenterButton, setShowCenterButton] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenControls, setShowFullscreenControls] = useState(false);
  const [showFullscreenSidebar, setShowFullscreenSidebar] = useState(true);
  const [fullscreenElementsOpen, setFullscreenElementsOpen] = useState(false);
  const [fullscreenDrawNoteOpen, setFullscreenDrawNoteOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const fullscreenProgressBarRef = useRef<HTMLDivElement>(null);
  const progressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const centerButtonTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fullscreenTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      setCurrentVideoTime(currentTime);
      onTimeUpdate(currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      console.log(
        "handlePlayPause called, isPlaying:",
        isPlaying,
        "video.paused:",
        videoRef.current.paused
      );

      if (videoRef.current.paused) {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      } else {
        videoRef.current.pause();
      }

      // Center button ko'rsatish
      setShowCenterButton(true);
      if (centerButtonTimeoutRef.current) {
        clearTimeout(centerButtonTimeoutRef.current);
      }
      centerButtonTimeoutRef.current = setTimeout(() => {
        setShowCenterButton(false);
      }, 1000);
    }
  };

  const handleSkipBack = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, currentVideoTime - 10);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, currentVideoTime + 10);
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, currentVideoTime - 30);
    }
  };

  const handleFastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, currentVideoTime + 30);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleVideoMouseEnter = () => {
    setShowProgressBar(true);
    if (progressTimeoutRef.current) {
      clearTimeout(progressTimeoutRef.current);
    }
  };

  const handleVideoMouseLeave = () => {
    if (!isDragging) {
      progressTimeoutRef.current = setTimeout(() => {
        setShowProgressBar(false);
      }, 2000);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const progressWidth = rect.width;
      const clickPercent = clickX / progressWidth;
      const newTime = clickPercent * duration;
      videoRef.current.currentTime = newTime;
      setCurrentVideoTime(newTime);
    }
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgressClick(e);
  };

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleProgressClick(e);
    }
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  const handleFullscreenToggle = async () => {
    try {
      if (!isFullscreen) {
        // Entering fullscreen - use native browser fullscreen
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        setShowFullscreenControls(true);

        if (fullscreenTimeoutRef.current) {
          clearTimeout(fullscreenTimeoutRef.current);
        }
        fullscreenTimeoutRef.current = setTimeout(() => {
          setShowFullscreenControls(false);
        }, 3000);
      } else {
        // Exiting fullscreen
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
      const newFullscreenState = !isFullscreen;
      setIsFullscreen(newFullscreenState);

      if (newFullscreenState) {
        setShowFullscreenControls(true);
        if (fullscreenTimeoutRef.current) {
          clearTimeout(fullscreenTimeoutRef.current);
        }
        fullscreenTimeoutRef.current = setTimeout(() => {
          setShowFullscreenControls(false);
        }, 3000);
      }
    }
  };

  const handleFullscreenMouseMove = () => {
    if (isFullscreen) {
      setShowFullscreenControls(true);
      if (fullscreenTimeoutRef.current) {
        clearTimeout(fullscreenTimeoutRef.current);
      }
      fullscreenTimeoutRef.current = setTimeout(() => {
        setShowFullscreenControls(false);
      }, 3000);
    }
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handlePlayPause();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPlaying]);

  // Fullscreen change event handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isFullscreen]);

  const progressPercent =
    duration > 0 ? (currentVideoTime / duration) * 100 : 0;

  // Fullscreen video player
  if (isFullscreen) {
    return (
      <div
        className="absolute inset-0 bg-black z-50"
        onMouseMove={handleFullscreenMouseMove}
      >
        {/* Fullscreen Video */}
        <div className="absolute inset-0 z-0">
          {currentPosition === "first" ? (
            content.videoUrl ? (
              isYouTubeUrl(content.videoUrl) ? (
                <YouTubePlayer
                  videoUrl={content.videoUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full"
                />
              ) : (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src={content.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                <div className="text-center">
                  <div className="text-6xl mb-4">📹</div>
                  <p className="text-lg">Video mavjud emas</p>
                </div>
              </div>
            )
          ) : content.embedded3d ? (
            <div className="w-full h-full">
              <div className="sketchfab-embed-wrapper w-full h-full">
                <iframe
                  title="3D Model"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  src={content.embedded3d}
                  className="w-full h-full"
                />
              </div>
            </div>
          ) : content.model3dUrl ? (
            <ThreeDAnimation />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
              <div className="text-center">
                <div className="text-6xl mb-4">🎮</div>
                <p className="text-lg">3D Model mavjud emas</p>
              </div>
            </div>
          )}

          {/* Fullscreen Progress Bar - faqat video uchun */}
          {currentPosition === "first" && (
            <div
              className={`absolute bottom-20 left-0 right-0 p-4 pl-6 transition-opacity duration-300 z-20 ${
                showFullscreenControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                ref={fullscreenProgressBarRef}
                className="w-full h-2 bg-gray-600 bg-opacity-50 rounded-full cursor-pointer relative"
                onClick={handleProgressClick}
                onMouseDown={handleProgressMouseDown}
                onMouseMove={handleProgressMouseMove}
                onMouseUp={handleProgressMouseUp}
              >
                {/* Progress Fill */}
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                ></div>

                {/* Progress Handle */}
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-green-500 rounded-full shadow-lg border-2 border-white transition-all duration-100 hover:scale-110"
                  style={{ left: `calc(${progressPercent}% - 10px)` }}
                ></div>
              </div>
            </div>
          )}

          {/* Fullscreen Controls - faqat video uchun */}
          {currentPosition === "first" && (
            <div
              className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 z-20 ${
                showFullscreenControls ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className={`bg-white/20 backdrop-blur-md rounded-lg p-2 border border-white/30`}
              >
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={handlePlayPause}
                    className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-all"
                  >
                    {isPlaying ? (
                      <Pause size={24} className="text-white" />
                    ) : (
                      <Play size={24} className="text-white ml-[2px]" />
                    )}
                  </button>

                  {/* Skip Back */}
                  <button
                    onClick={handleSkipBack}
                    className="p-2 text-white hover:bg-white/20 rounded"
                  >
                    <SkipBack size={20} />
                  </button>

                  {/* Skip Forward */}
                  <button
                    onClick={handleSkipForward}
                    className="p-2 text-white hover:bg-white/20 rounded"
                  >
                    <SkipForward size={20} />
                  </button>

                  {/* Volume */}
                  <button
                    onClick={handleMuteToggle}
                    className="p-2 text-white hover:bg-white/20 rounded"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>

                  {/* Time */}
                  <div className="text-white font-mono text-sm">
                    {formatTime(currentVideoTime)} / {formatTime(duration)}
                  </div>

                  <div className="flex-1"></div>

                  {/* Exit Fullscreen */}
                  <button
                    onClick={handleFullscreenToggle}
                    className="p-2 text-white hover:bg-white/20 rounded"
                  >
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden z-10">
      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Video Section - Har doim ko'rinadi */}
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm p-2 mb-2">
            <div
              className="bg-black rounded-lg aspect-[16/9] relative overflow-hidden max-w-4xl mx-auto"
              onMouseEnter={handleVideoMouseEnter}
              onMouseLeave={handleVideoMouseLeave}
            >
              {currentPosition === "first" ? (
                content.videoUrl ? (
                  isYouTubeUrl(content.videoUrl) ? (
                    <YouTubePlayer
                      videoUrl={content.videoUrl}
                      onTimeUpdate={handleTimeUpdate}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                      className="w-full h-full"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source src={content.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📹</div>
                      <p className="text-lg">Video mavjud emas</p>
                    </div>
                  </div>
                )
              ) : content.embedded3d ? (
                <div className="w-full h-full">
                  <div className="sketchfab-embed-wrapper w-full h-full">
                    <iframe
                      title="3D Model"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope; magnetometer; camera; microphone"
                      src={content.embedded3d}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              ) : content.model3dUrl ? (
                <ThreeDAnimation modelUrl={content.model3dUrl} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎮</div>
                    <p className="text-lg">3D Model mavjud emas</p>
                  </div>
                </div>
              )}

              {/* Play Button Overlay - faqat local video uchun */}
              {currentPosition === "first" &&
                content.videoUrl &&
                !isYouTubeUrl(content.videoUrl) && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      showCenterButton ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <button
                      onClick={handlePlayPause}
                      className="p-6 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all border border-white/30 shadow-lg"
                    >
                      {isPlaying ? (
                        <Pause size={32} className="text-white" />
                      ) : (
                        <Play size={32} className="text-white ml-1" />
                      )}
                    </button>
                  </div>
                )}

              {/* Progress Bar Overlay - faqat local video uchun */}
              {currentPosition === "first" &&
                content.videoUrl &&
                !isYouTubeUrl(content.videoUrl) && (
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
                      showProgressBar ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div
                      ref={progressBarRef}
                      className="w-full h-2 bg-gray-600 bg-opacity-50 rounded-full cursor-pointer relative"
                      onClick={handleProgressClick}
                      onMouseDown={handleProgressMouseDown}
                      onMouseMove={handleProgressMouseMove}
                      onMouseUp={handleProgressMouseUp}
                    >
                      {/* Progress Fill */}
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-100"
                        style={{ width: `${progressPercent}%` }}
                      ></div>

                      {/* Progress Handle */}
                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full shadow-lg border-2 border-white transition-all duration-100 hover:scale-110"
                        style={{ left: `calc(${progressPercent}% - 8px)` }}
                      ></div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Subtitle - video tagidan, media controller tepasidan */}
          {isCCActive &&
            (subtitleMode === "both" || subtitleMode === "center") && (
              <div className="w-full flex justify-center mb-2">
                <div className="bg-white/80 text-gray-800 px-4 py-2 rounded shadow text-center text-base font-medium max-w-4xl">
                  Yer Quyosh sistemasida 3 chi o'rinda joylashgan
                </div>
              </div>
            )}

          {/* Media Controls - Faqat local video uchun ko'rinadi */}
          {content.videoUrl && !isYouTubeUrl(content.videoUrl) && (
            <div className="bg-white rounded-lg shadow-sm p-4 max-w-4xl mx-auto">
              <div className="flex items-center gap-4">
                {/* Left side - File controls */}
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <Camera size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <Video size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <Folder size={20} />
                </button>

                <div className="flex-1"></div>

                {/* Speed controls - media controllerning chap tarafida */}
                <button
                  onClick={handleRewind}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  title="Rewind 30s"
                >
                  <Rewind size={20} />
                </button>
                <button
                  onClick={handleFastForward}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  title="Fast Forward 30s"
                >
                  <FastForward size={20} />
                </button>

                {/* Media controls - Maximize va Settings yonida */}
                <button
                  onClick={handleSkipBack}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  title="Skip Back 10s"
                >
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <PauseCircle size={20} />
                  ) : (
                    <PlayCircle size={20} />
                  )}
                </button>
                <button
                  onClick={handleSkipForward}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  title="Skip Forward 10s"
                >
                  <SkipForward size={20} />
                </button>
                <button
                  onClick={handleMuteToggle}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                {/* Time display */}
                <div className="text-sm text-gray-600 font-mono">
                  {formatTime(currentVideoTime)} / {formatTime(duration)}
                </div>

                {/* Right side - Settings */}
                <button
                  onClick={handleFullscreenToggle}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  title="Fullscreen"
                >
                  <Maximize size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <Box size={20} />
                </button>
              </div>
            </div>
          )}

          {/* YouTube video uchun ma'lumot - faqat first position da */}
          {currentPosition === "first" &&
            content.videoUrl &&
            isYouTubeUrl(content.videoUrl) && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-2 text-blue-800">
                  <div className="text-2xl">📺</div>
                  <div>
                    <p className="font-medium">YouTube video</p>
                    <p className="text-sm text-blue-600">
                      Video YouTube player orqali boshqariladi. Play tugmasini
                      bosib videoni boshlang.
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Exercise Polygon - O'rtada overlay sifatida ko'rinadi */}
      {showExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <ExercisePolygon
              exercises={content.exercises}
              onClose={onExerciseClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentViewer;
