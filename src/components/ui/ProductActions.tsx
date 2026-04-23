import React from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  Share2,
  QrCode,
  Download,
  Settings,
  Heart,
  MessageCircle,
} from "lucide-react";
import { ProductDetail } from "@/types";
import { Button } from "./Button";

interface ProductActionsProps {
  product: ProductDetail;
  isBookmarked: boolean;
  onBookmark: () => void;
  onShare: () => void;
  onQRCode: () => void;
  onDownload?: () => void;
  onManage?: () => void;
  onLike?: () => void;
  onComments?: () => void;
}

export function ProductActions({
  product,
  isBookmarked,
  onBookmark,
  onShare,
  onQRCode,
  onDownload,
  onManage,
  onLike,
  onComments,
}: ProductActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
    >
      {/* Primary CTA */}
      <Button
        size="lg"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg mb-4"
        onClick={() => {
          // Navigate to product usage/start page
          if (process.env.NODE_ENV === "development") {
            console.log("Starting product:", product.id);
          }
        }}
      >
        Boshlash
      </Button>

      {/* Secondary Actions */}
      <div className="flex gap-2">
        {/* Bookmark */}
        <Button
          variant="outline"
          onClick={onBookmark}
          className={`flex-1 flex items-center gap-2 ${
            isBookmarked
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "hover:bg-gray-50"
          }`}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark
            className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
          />
          {isBookmarked ? "Saqlangan" : "Saqlash"}
        </Button>

        {/* Share */}
        <Button
          variant="outline"
          onClick={onShare}
          className="flex-1 flex items-center gap-2 hover:bg-gray-50"
          aria-label="Share product"
        >
          <Share2 className="w-4 h-4" />
          Ulashish
        </Button>
      </div>
    </motion.div>
  );
}
