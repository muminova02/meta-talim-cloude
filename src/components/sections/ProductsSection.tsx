// Main Products section component with sidebar and improved layout
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Grid3X3,
  BookOpen,
  GraduationCap,
  Users,
  Brain,
  Atom,
  Zap,
  Gamepad2,
  Eye,
  Heart,
  Clock,
  ChevronUp,
  Filter,
} from "lucide-react";
import { products } from "../../data/products";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../ui/ProductCard";
import ProductFilters from "./tabs/ProductFilters";
import ProductButton from "../ui/ProductButton";

const ProductsSection: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isContentExpanded, setIsContentExpanded] = useState(true);
  const [isSubjectExpanded, setIsSubjectExpanded] = useState(true);

  const {
    products: paginatedProducts,
    categories,
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    sort,
    setSort,
    hasMore,
    loadMore,
    totalProducts,
  } = useProducts({ products });

  // Content type categories (3D, VR, AR, etc.)
  const contentCategories = [
    { name: "3D", icon: Grid3X3, color: "text-blue-600" },
    { name: "Animatsiya", icon: Zap, color: "text-purple-600" },
    { name: "Taqdimot", icon: BookOpen, color: "text-green-600" },
    { name: "Media", icon: Eye, color: "text-orange-600" },
    { name: "QR Code", icon: Grid3X3, color: "text-gray-600" },
    { name: "VR", icon: Gamepad2, color: "text-cyan-600" },
    { name: "AR", icon: Brain, color: "text-pink-600" },
    { name: "Interactive", icon: Users, color: "text-indigo-600" },
  ];

  // Subject categories (Biologiya, Tarix, etc.)
  const subjectCategories = [
    { name: "Biologiya", icon: Atom, color: "text-emerald-600" },
    { name: "Tarix", icon: BookOpen, color: "text-amber-600" },
    { name: "Fizika", icon: Zap, color: "text-blue-600" },
    { name: "Kimyo", icon: Atom, color: "text-red-600" },
    { name: "Matematika", icon: Grid3X3, color: "text-purple-600" },
    { name: "Geografiya", icon: Eye, color: "text-green-600" },
  ];

  // Multi-selection handlers
  const toggleContentCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleSubjectCategory = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubjects([]);
  };

  const trendFilters = [
    "dinazavur",
    "vr atom bomba",
    "ar laptop",
    "tarmoqlar sathi",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Left Sidebar */}
          <div className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-4 sm:p-6 h-fit flex-shrink-0">
            {/* Educational Level Toggle */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Ta'lim darajasi
              </h3>
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button className="flex-1 py-2 px-3 text-sm font-medium bg-emerald-600 text-white rounded-md transition-colors">
                  Maktab
                </button>
                <button className="flex-1 py-2 px-3 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
                  Universitet
                </button>
              </div>
            </div>

            {/* Clear All Filters */}
            {(selectedCategories.length > 0 || selectedSubjects.length > 0) && (
              <div className="mb-4">
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2 px-3 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Barcha filtrlarni tozalash</span>
                </button>
              </div>
            )}

            {/* Content Type Categories */}
            <div className="mb-6">
              <button
                onClick={() => setIsContentExpanded(!isContentExpanded)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-sm font-semibold text-gray-700">
                  Kontent turlari
                </h3>
                {isContentExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {isContentExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 space-y-2"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                      {contentCategories.map((category) => {
                        const isSelected = selectedCategories.includes(
                          category.name
                        );
                        return (
                          <button
                            key={category.name}
                            onClick={() => toggleContentCategory(category.name)}
                            className={`p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-1 sm:space-y-2 ${
                              isSelected
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-25"
                            }`}
                          >
                            <category.icon
                              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                isSelected ? "text-emerald-600" : category.color
                              }`}
                            />
                            <span className="text-xs font-medium text-center">
                              {category.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subject Categories */}
            <div className="mb-6">
              <button
                onClick={() => setIsSubjectExpanded(!isSubjectExpanded)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-sm font-semibold text-gray-700">Fanlar</h3>
                {isSubjectExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {isSubjectExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 space-y-2"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                      {subjectCategories.map((subject) => {
                        const isSelected = selectedSubjects.includes(
                          subject.name
                        );
                        return (
                          <button
                            key={subject.name}
                            onClick={() => toggleSubjectCategory(subject.name)}
                            className={`p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-1 sm:space-y-2 ${
                              isSelected
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-25"
                            }`}
                          >
                            <subject.icon
                              className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                isSelected ? "text-emerald-600" : subject.color
                              }`}
                            />
                            <span className="text-xs font-medium text-center">
                              {subject.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                  <ProductButton
                    variant="primary"
                    size="sm"
                    className="flex items-center space-x-2 w-full sm:w-auto"
                  >
                    <span>Hammasi</span>
                    <ChevronDown className="w-4 h-4" />
                  </ProductButton>

                  <div className="relative flex-1 w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Qidiruv..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="relative w-full sm:w-auto">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as any)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none w-full sm:w-auto"
                    >
                      <option value="popularity">Mashhurlik</option>
                      <option value="newest">Yangi</option>
                      <option value="price-asc">Narx: Pastdan yuqoriga</option>
                      <option value="price-desc">Narx: Yuqoridan pastga</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Trend Filters */}
              <div className="flex flex-wrap gap-2">
                {trendFilters.map((trend) => (
                  <button
                    key={trend}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Sections */}
            <div className="space-y-8">
              {/* ALL Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">ALL</h2>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  <AnimatePresence>
                    {paginatedProducts.slice(0, 8).map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Biologiya Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Biologiya
                </h2>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  <AnimatePresence>
                    {paginatedProducts
                      .filter((p) => p.category === "Biologiya")
                      .slice(0, 8)
                      .map((product, index) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          index={index}
                        />
                      ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <ProductButton
                  onClick={loadMore}
                  variant="outline"
                  size="lg"
                  className="px-8"
                >
                  Ko'proq yuklash
                </ProductButton>
              </div>
            )}

            {/* Results Count */}
            <div className="text-center mt-6 text-gray-600">
              {totalProducts > 0 && (
                <p>
                  {totalProducts} ta mahsulot topildi
                  {activeCategory !== "All" &&
                    ` (${activeCategory} kategoriyasida)`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
