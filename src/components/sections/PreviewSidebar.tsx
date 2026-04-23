import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { ProductDetail, RelatedItem } from "@/types";
import { fetchProducts, type ProductDto } from "@/api/productApi";
import { resolveApiUrl } from "@/api/http";
import { useNavigate } from "react-router-dom";

interface PreviewSidebarProps {
  product: ProductDetail;
  onRelatedItemClick?: (item: RelatedItem) => void;
}

export function PreviewSidebar({
  product,
  onRelatedItemClick,
}: PreviewSidebarProps) {
  const [selectedUsedBy, setSelectedUsedBy] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const usedByOptions = useMemo(
    () => ["All", ...(product.usedBy || [])],
    [product.usedBy],
  );

  const [relatedItems, setRelatedItems] = useState<RelatedItem[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoadingRelated(true);
        const dtos = await fetchProducts();
        if (!mounted) return;

        const currentId = String(product.id);
        const mapped: RelatedItem[] = dtos
          .filter((d) => String(d.id) !== currentId)
          .map(
            (d: ProductDto): RelatedItem => ({
              id: String(d.id),
              title: d.title,
              description: d.description,
              thumbnail: d.thumbnail
                ? resolveApiUrl(d.thumbnail)
                : "/images/atom_bomba.jpg",
              category: d.category,
              views: d.views ?? 0,
              likes: d.likes ?? 0,
            }),
          );

        // Prefer same category, then likes.
        const sameCategory = mapped.filter(
          (x) => x.category === product.category,
        );
        const otherCategory = mapped.filter(
          (x) => x.category !== product.category,
        );

        const pick = [...sameCategory, ...otherCategory];
        pick.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));

        setRelatedItems(pick.slice(0, 12));
      } catch {
        if (!mounted) return;
        setRelatedItems([]);
      } finally {
        if (!mounted) return;
        setLoadingRelated(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [product.id, product.category]);

  const filteredRelatedItems = useMemo(() => {
    // No "used by" analytics endpoints yet, so we keep list stable.
    // (Dropdown stays functional, but doesn't change filtering.)
    return relatedItems;
  }, [relatedItems, selectedUsedBy]);

  const handleRelatedItemClick = (item: RelatedItem) => {
    if (onRelatedItemClick) {
      onRelatedItemClick(item);
    } else {
      navigate(`/products/${item.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-4"
    >
      {/* Used By Dropdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Used by</h3>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            aria-label="Select organization"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            <span className="text-gray-700">{selectedUsedBy}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                role="listbox"
              >
                {usedByOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedUsedBy(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedUsedBy === option
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700"
                    }`}
                    role="option"
                    aria-selected={selectedUsedBy === option}
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Related Items - YouTube style */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          O'xshash mavzular
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {!loadingRelated &&
              filteredRelatedItems.slice(0, 6).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                onClick={() => handleRelatedItemClick(item)}
              >
                {/* Thumbnail - Larger size */}
                <div className="w-52 h-34 bg-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {item.views.toLocaleString()} ko'rish
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.likes.toLocaleString()} like
                    </span>
                  </div>
                </div>
              </motion.div>
              ))}
          </AnimatePresence>
          {loadingRelated && (
            <div className="text-xs text-gray-500 py-2">Loading...</div>
          )}
        </div>
      </div>

      {/* Qollanilgan manbalar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Qollanilgan manbalar
        </h3>
        <div className="space-y-2">
          {product.resources && product.resources.length > 0 ? (
            product.resources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 bg-gray-50 hover:bg-emerald-50 rounded-lg transition-colors group text-xs"
                whileHover={{ x: 4 }}
                aria-label={`Open ${resource.label} in new tab`}
              >
                <span className="text-gray-700 group-hover:text-emerald-700">
                  {resource.label}
                </span>
                <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-emerald-600" />
              </motion.a>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p className="text-xs">Hech qanday manba mavjud emas</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
