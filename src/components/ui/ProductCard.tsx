// Individual product card component with improved styling matching the design
import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  ThumbsUp,
  Globe,
  Camera,
  MoreVertical,
  Languages,
  Video,
  FlaskConical,
  Box,
  Presentation,
} from "lucide-react";
import { Product } from "../../types";
import { formatCurrency } from "../../lib/utils";
import Badge from "./badge";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      {/* Image Container */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-44 sm:h-48 rounded-t-xl"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/atom_bomba.jpg";
          }}
        />

        {/* pro badge - chap burchak */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <div className="relative">
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-sm rounded-full"></div>

              {/* Badge content */}
              <div className="relative bg-gradient-to-r from-emerald-500/35 to-emerald-600/35 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg border border-white/20 backdrop-blur-sm">
                {product.badge}
              </div>
            </div>
          </div>
        )}

        {/* Category indicator vector - ba'zi cardlarda */}
        {product.id === "1" || product.id === "3" || product.id === "5" ? (
          <div className="absolute top-0 right-0 w-[74px] h-[66px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="85"
              height="75"
              viewBox="0 0 85 75"
              fill="none"
              className="w-full h-full"
            >
              <foreignObject
                x="0.845013"
                y="-8.34298"
                width="91.498"
                height="83.3019"
              >
                <div
                  style={{
                    backdropFilter: "blur(1.61px)",
                    clipPath: "url(#bgblur_0_278_211_clip_path)",
                    height: "100%",
                    width: "100%",
                  }}
                ></div>
              </foreignObject>
              <g
                filter="url(#filter0_d_278_211)"
                data-figma-bg-blur-radius="3.22314"
              >
                <path
                  d="M84 66L10 0H57L84 26.4V66Z"
                  fill="#14AE5C"
                  fillOpacity="0.35"
                  shapeRendering="crispEdges"
                />
                <path
                  d="M84 66L10 0H57L84 26.4V66Z"
                  stroke="white"
                  strokeOpacity="0.26"
                  shapeRendering="crispEdges"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_278_211"
                  x="0.845013"
                  y="-8.34298"
                  width="91.498"
                  height="83.3019"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feMorphology
                    radius="0.53719"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect1_dropShadow_278_211"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="3.65289" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_278_211"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_278_211"
                    result="shape"
                  />
                </filter>
                <clipPath
                  id="bgblur_0_278_211_clip_path"
                  transform="translate(-0.845013 8.34298)"
                >
                  <path d="M84 66L10 0H57L84 26.4V66Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Diamond belgichasi - vector ichida */}
            <div className="absolute top-3 right-4 w-4 h-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M22.9237 9.37971L17.6737 3.37971C17.6209 3.3193 17.5557 3.27089 17.4826 3.23774C17.4095 3.20459 17.3302 3.18747 17.25 3.18752H6.74996C6.67006 3.18688 6.59095 3.20328 6.51788 3.23561C6.44481 3.26794 6.37947 3.31546 6.32621 3.37502L1.07621 9.37502C0.985627 9.47964 0.936791 9.61398 0.939039 9.75235C0.941288 9.89071 0.994463 10.0234 1.0884 10.125L11.5884 21.375C11.641 21.4315 11.7047 21.4766 11.7755 21.5074C11.8463 21.5382 11.9227 21.5541 12 21.5541C12.0772 21.5541 12.1536 21.5382 12.2244 21.5074C12.2952 21.4766 12.3589 21.4315 12.4115 21.375L22.9115 10.125C23.0042 10.0237 23.0565 9.89196 23.0588 9.75467C23.061 9.61738 23.013 9.48402 22.9237 9.37971ZM7.11933 10.3125L10.3631 18.421L2.79465 10.3125H7.11933ZM15.6693 10.3125L12 19.485L8.33058 10.3125H15.6693ZM8.62496 9.18752L12 4.68752L15.375 9.18752H8.62496ZM16.8806 10.3125H21.2053L13.6368 18.421L16.8806 10.3125ZM21.2606 9.18752H16.7812L13.125 4.31252H16.995L21.2606 9.18752ZM7.00496 4.31252H10.875L7.21871 9.18752H2.73933L7.00496 4.31252Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        ) : null}
      </div>

      {/* 4 ta element - rasm tagida, title tepasida */}
      <div className="relative -mt-6 mx-0 mb-0">
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            width: "100%",
            height: "19.339px",
            flexShrink: 0,
            border: "1.074px solid rgba(255, 255, 255, 0.26)",
            background: "rgba(20, 174, 92, 0.35)",
            boxShadow: "0 0 7.306px 0.537px #FFF",
            backdropFilter: "blur(1.6115702390670776px)",
          }}
        >
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-white">
              <Video className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 text-white">
              <Box className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1 text-white">
              <Presentation className="w-4 h-4" />
            </div>
          </div>
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <MoreVertical className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-emerald-700 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Meta Information Row */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{product.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{product.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Languages className="w-4 h-4" />
              <span>{product.language || "UZB"}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
