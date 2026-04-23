import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Download,
  Share2,
  Maximize,
  Eye,
  HelpCircle,
  FlaskConical,
  Beaker,
  Brain,
  ArrowRight,
} from "lucide-react";
import { ProductDetail } from "@/types";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import ThreeDAnimation from "@/components/sections/ThreeDAnimation";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface ProductMediaProps {
  product: ProductDetail;
  onShare?: () => void;
  onDownload?: () => void;
}

export function ProductMedia({
  product,
  onShare,
  onDownload,
}: ProductMediaProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const navigate = useNavigate();

  const activeMedia = product.media[activeMediaIndex];

  // Icon mapping for exercise types
  const getExerciseIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      HelpCircle,
      FlaskConical,
      Beaker,
      Brain,
    };
    return iconMap[iconName] || HelpCircle;
  };

  const handleThumbnailClick = (index: number) => {
    setActiveMediaIndex(index);
    setIsVideoPlaying(false);
  };

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  const renderMedia = () => {
    if (!activeMedia) return null;

    switch (activeMedia.type) {
      case "image":
        return (
          <img
            src={activeMedia.src}
            alt={product.title}
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        );

      case "video": {
        const ytEmbed = getYouTubeEmbedUrl(activeMedia.src);
        if (ytEmbed) {
          return (
            <div className="relative w-full h-full min-h-[200px] rounded-2xl overflow-hidden bg-black">
              <iframe
                title={product.title}
                src={ytEmbed}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          );
        }

        return (
          <div className="relative w-full h-full">
            {!isVideoPlaying ? (
              <div className="relative w-full h-full">
                <img
                  src={activeMedia.poster || activeMedia.src}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                  <Button
                    onClick={handlePlayVideo}
                    size="lg"
                    className="bg-white/90 hover:bg-white text-black rounded-full p-4"
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </Button>
                </div>
              </div>
            ) : (
              <video
                src={activeMedia.src}
                controls
                playsInline
                autoPlay
                className="w-full h-full object-cover rounded-2xl"
                onEnded={() => setIsVideoPlaying(false)}
              />
            )}
          </div>
        );
      }

      case "3d":
        return (() => {
          const src = activeMedia.src;
          const isGlbOrGltf =
            /\.(glb|gltf)(\?|#|$)/i.test(src) || src.endsWith(".glb");

          if (isGlbOrGltf) {
            return <ThreeDAnimation modelUrl={src} />;
          }

          return (
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <iframe
                title="3D Model"
                frameBorder={0}
                allowFullScreen
                // Sketchfab-style embeds typically work with these permissions
                allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope; magnetometer; camera; microphone"
                src={src}
                className="w-full h-full"
              />
            </div>
          );
        })();

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Main Media Display - Smaller height */}
      <div className="relative aspect-[16/8] bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMediaIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {renderMedia()}
          </motion.div>
        </AnimatePresence>

        {/* Media Controls Overlay - Only Fullscreen for non-3D media */}
        <div className="absolute top-4 right-4">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg"
            aria-label="View fullscreen"
            onClick={() => {
              if (process.env.NODE_ENV === "development") {
                console.log("Opening fullscreen");
              }
            }}
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Product Title - Always show */}
      <div className="p-4 border-t border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>
        </motion.div>
      </div>

      {/* Thumbnail Strip */}
      {product.media.length > 1 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2 overflow-x-auto justify-between">
            <div className="flex gap-2">
              {product.media.map((media, index) => (
                <motion.button
                  key={media.id}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 w-16 h-10 rounded-lg overflow-hidden ${
                    index === activeMediaIndex
                      ? "ring-2 ring-emerald-500 ring-offset-2"
                      : "opacity-60 hover:opacity-80"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View ${media.type} ${index + 1}`}
                >
                  {media.type === "image" ? (
                    <img
                      src={media.src}
                      alt={`${product.title} ${media.type} ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : media.type === "video" ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Play className="w-3 h-3 text-gray-600" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                      <Eye className="w-3 h-3 text-emerald-600" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-3 justify-right">
              <Button
                variant="outline"
                className="bg-white/90 hover:bg-white text-emerald-700 border-emerald-300 hover:border-emerald-400 shadow-md"
                onClick={() => {
                  navigate(`/product-process/${product.id}`);
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Web sahifada ko'rish
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                onClick={() => {
                  if (process.env.NODE_ENV === "development") {
                    console.log("Opening PC app");
                  }
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                PC Ilovada ochish
              </Button>
              {/* Action Buttons - Right side */}
              <Button
                variant="secondary"
                size="icon"
                onClick={onShare}
                className="bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg border-solid border-2 border-emerald-300"
                aria-label="Share media"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={onDownload}
                className="bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg border-solid border-2 border-emerald-300"
                aria-label="Download media"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Exercises Section */}
      {product.interactiveExercises &&
        product.interactiveExercises.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-emerald-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-800 font-semibold text-base">
                    Mashg'ulotlar
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {(() => {
                    // Count exercises by type
                    const exerciseCounts = product.interactiveExercises.reduce(
                      (acc, exercise) => {
                        acc[exercise.type] = (acc[exercise.type] || 0) + 1;
                        return acc;
                      },
                      {} as Record<string, number>
                    );

                    return Object.entries(exerciseCounts).map(
                      ([type, count]) => {
                        const exercise = product.interactiveExercises.find(
                          (ex) => ex.type === type
                        );
                        const IconComponent = getExerciseIcon(
                          exercise?.icon || "HelpCircle"
                        );
                        return (
                          <div
                            key={type}
                            className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                          >
                            <span className="font-bold text-emerald-600 text-sm">
                              {count}
                            </span>
                            <IconComponent className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs text-gray-600 font-medium capitalize">
                              {type}
                            </span>
                          </div>
                        );
                      }
                    );
                  })()}
                </div>
              </div>
              <Button
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                onClick={() => {
                  // TODO: Open exercises modal or navigate to exercises
                  console.log("Start exercises:", product.interactiveExercises);
                }}
              >
                <span className="flex items-center gap-2">
                  <span>Boshlash</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </div>
        )}
    </div>
  );
}
