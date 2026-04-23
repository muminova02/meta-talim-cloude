import React from "react";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import { RelatedItem } from "@/types";

interface RelatedCardProps {
  item: RelatedItem;
  onClick?: (item: RelatedItem) => void;
}

export function RelatedCard({ item, onClick }: RelatedCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(item);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.title}`}
      data-testid={`related-card-${item.id}`}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            {item.category}
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{item.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>{item.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
