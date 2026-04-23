import { useState, useEffect } from "react";
import { ProductDetail, UseProductPreviewReturn } from "@/types";
import { copyToClipboard } from "@/lib/utils";
import { fetchProductById, ProductDetailDto } from "@/api/productApi";
import { resolveApiUrl } from "@/api/http";
import { fetchComments } from "@/api/commentApi";

function mapProductDtoToDetail(
  dto: ProductDetailDto,
  commentCount: number,
): ProductDetail {
  const durationMinutes =
    typeof dto.duration === "number"
      ? `${Math.round(dto.duration / 60)} minutes`
      : undefined;

  const media: ProductDetail["media"] = [];

  // Order matters:
  // - UI default activeMediaIndex=0, so thumbnail should be first.
  // - "Web sahifada ko'rish" button shows only when media.length > 1,
  //   so we include at least one extra media (3d/video) after thumbnail.
  if (dto.thumbnail) {
    media.push({
      id: "thumb",
      type: "image",
      src: resolveApiUrl(dto.thumbnail),
    });
  }

  if (dto.video_url) {
    const videoSrc = resolveApiUrl(dto.video_url);
    const posterSrc = dto.thumbnail ? resolveApiUrl(dto.thumbnail) : undefined;
    media.push({
      id: "video",
      type: "video",
      src: videoSrc,
      poster: posterSrc,
    });
  }

  // Append 3D after thumbnail/video.
  if (dto.embedded_3d) {
    media.push({
      id: "embedded-3d",
      type: "3d",
      src: resolveApiUrl(dto.embedded_3d),
    });
  } else if (dto.model_3d_url) {
    media.push({
      id: "model-3d",
      type: "3d",
      src: resolveApiUrl(dto.model_3d_url),
    });
  }

  return {
    id: String(dto.id),
    title: dto.title,
    description: dto.description,
    category: dto.category,
    tags: [],
    media,
    author: {
      id: "author-1",
      name: "Unknown author",
    },
    publishedAt: dto.created_at,
    views: dto.views ?? 0,
    likes: dto.likes ?? 0,
    price: 0,
    duration: durationMinutes,
    resources:
      dto.resources?.map((r) => ({
        label: r.label,
        url: resolveApiUrl(r.url),
        type: r.type,
        isDownload: r.is_download ?? false,
      })) ?? [],
    usedBy: [],
    comments: [],
    relatedItems: [],
    interactiveExercises: [],
  };
}

export function useProductPreview(productId: string): UseProductPreviewReturn {
  const [data, setData] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [dto, comments] = await Promise.all([
          fetchProductById(productId),
          fetchComments(productId).catch(() => []),
        ]);
        setData(mapProductDtoToDetail(dto, comments.length));
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productId]);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
    // TODO: call backend bookmark API when implemented
  };

  const copyLink = async () => {
    const url = window.location.href;
    const success = await copyToClipboard(url);
    
    if (success) {
      // Show success feedback (could use toast notification)
      // For now, we'll just log to console in dev mode
      if (process.env.NODE_ENV === "development") {
        console.log("Link copied to clipboard");
      }
    } else {
      // Show error feedback
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to copy link");
      }
    }
  };

  const openShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.title || "Product Preview",
        text: data?.description || "",
        url: window.location.href,
      }).catch(() => {
        // Fallback to copy link if share fails
        copyLink();
      });
    } else {
      // Fallback to copy link if Web Share API is not supported
      copyLink();
    }
  };

  return {
    data,
    loading,
    error,
    toggleBookmark,
    copyLink,
    openShare,
    isBookmarked,
  };
}
