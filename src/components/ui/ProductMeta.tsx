import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Calendar, User } from "lucide-react";
import { ProductDetail } from "@/types";
import { Badge } from "./badge";
import { Button } from "./button";
import { formatDate, clampText } from "@/lib/utils";

interface ProductMetaProps {
  product: ProductDetail;
}

export function ProductMeta({ product }: ProductMetaProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const displayDescription = isDescriptionExpanded
    ? product.description
    : clampText(product.description, 3);

  const isDescriptionClamped =
    product.description.length > displayDescription.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      {/* Description */}
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-lg">
          {displayDescription}
        </p>
        {isDescriptionClamped && (
          <button
            onClick={toggleDescription}
            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
            aria-label={isDescriptionExpanded ? "Show less" : "Read more"}
          >
            {isDescriptionExpanded ? "Kamroq ko'rsatish" : "Ko'proq o'qish"}
          </button>
        )}
      </div>

      {/* Publication Date */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Chop etilgan:</span>{" "}
          {formatDate(product.publishedAt)}
        </p>
      </div>

      {/* Interactive Elements */}
      <div className="mt-6 bg-emerald-50 rounded-lg p-4">
        <h3 className="font-semibold text-emerald-800 mb-2">
          Mashg'ulotlarni sinab ko'ring:
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-800 font-bold text-sm">
              7
            </span>
            <span className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-800 font-bold text-sm">
              8
            </span>
            <span className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-800 font-bold text-sm">
              A
            </span>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Boshlash
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
