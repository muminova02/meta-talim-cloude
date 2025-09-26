import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Heart, Clock, Search, Filter, ChevronDown } from "lucide-react";

// Types
interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  views: number;
  likes: number;
  badge?: "Pro" | "Free" | "New";
  price?: number;
  duration?: string;
}

// Sample data
const products: Product[] = [
  {
    id: "1",
    title: "Quyosh sistemasi va 8 sayora",
    description:
      "Quyoshning gravitatsion ta'sir maydoni ichida harakatlanuvchi osmon jismlari to'plami bilan tanishing",
    category: "Fizika",
    image: "/images/solar-system.jpg",
    views: 120,
    likes: 5,
    badge: "Pro",
    price: 150000,
    duration: "45 min",
  },
  {
    id: "2",
    title: "Atom tuzilishi va elektronlar",
    description:
      "Atomning ichki tuzilishi, elektronlar va protonlar haqida batafsil ma'lumot",
    category: "Kimyo",
    image: "/images/atom.jpg",
    views: 89,
    likes: 12,
    badge: "New",
    price: 120000,
    duration: "30 min",
  },
  {
    id: "3",
    title: "Inson anatomiyasi - Yurak",
    description:
      "Yurakning tuzilishi va qanday ishlashini 3D model orqali o'rganing",
    category: "Biologiya",
    image: "/images/heart.jpg",
    views: 156,
    likes: 8,
    badge: "Pro",
    price: 180000,
    duration: "60 min",
  },
  {
    id: "4",
    title: "VR Kosmos sayohati",
    description:
      "Virtual reallikda kosmosga sayohat qiling va sayyoralarni yaqindan ko'ring",
    category: "VR",
    image: "/images/space-vr.jpg",
    views: 203,
    likes: 25,
    badge: "Pro",
    price: 250000,
    duration: "90 min",
  },
  {
    id: "5",
    title: "3D Molekula modellari",
    description:
      "Kimyoviy birikmalarning 3D modellarini o'rganing va ularni aylantiring",
    category: "3D",
    image: "/images/molecule.jpg",
    views: 78,
    likes: 6,
    badge: "Free",
    duration: "25 min",
  },
  {
    id: "6",
    title: "Dinazavrlar olami",
    description:
      "Qadimgi dinazavrlar haqida ma'lumot va ularning hayotini kuzating",
    category: "Biologiya",
    image: "/images/dinosaur.jpg",
    views: 134,
    likes: 15,
    badge: "New",
    price: 140000,
    duration: "40 min",
  },
  {
    id: "7",
    title: "Fizika laboratoriyasi",
    description: "Fizik qonunlarini virtual laboratoriyada tajriba qiling",
    category: "Fizika",
    image: "/images/physics-lab.jpg",
    views: 167,
    likes: 18,
    badge: "Pro",
    price: 200000,
    duration: "75 min",
  },
  {
    id: "8",
    title: "AR Laptop tuzilishi",
    description:
      "Kengaytirilgan reallikda laptopning ichki tuzilishini ko'ring",
    category: "AR",
    image: "/images/laptop-ar.jpg",
    views: 92,
    likes: 7,
    badge: "Free",
    duration: "20 min",
  },
  {
    id: "9",
    title: "VR Atom bomba tajribasi",
    description:
      "Atom bombasining ishlash prinsipi va ta'sirini VR da kuzating",
    category: "VR",
    image: "/images/atom-bomb.jpg",
    views: 145,
    likes: 22,
    badge: "Pro",
    price: 300000,
    duration: "120 min",
  },
];

const categories = ["All", "Biologiya", "Kimyo", "Fizika", "VR", "3D", "AR"];

// ProductCard Component
const ProductCard: React.FC<{ product: Product; index: number }> = ({
  product,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
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
          className="object-cover w-full h-44 sm:h-48"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/placeholder.svg";
          }}
        />
        {product.badge && (
          <div
            className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
              product.badge === "Pro"
                ? "bg-yellow-500 text-white"
                : product.badge === "New"
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {product.badge}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-emerald-700 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{product.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{product.likes}</span>
            </div>
            {product.duration && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{product.duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        {product.price && (
          <div className="text-right">
            <span className="text-lg font-bold text-emerald-600">
              {product.price.toLocaleString()} so'm
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Main Products Component
const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-4">
          Products
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kengaytirilgan reallik va 3D texnologiyalar bilan ta'limni kelajakka
          olib boruvchi mahsulotlar
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Mahsulotlarni qidiring..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            aria-label="Mahsulotlarni qidirish"
          />
        </div>
      </div>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
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
          {paginatedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Hech qanday mahsulot topilmadi
          </h3>
          <p className="text-gray-500">
            Qidiruv so'zini o'zgartiring yoki boshqa kategoriyani tanlang
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Oldingi
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-emerald-600 text-white"
                  : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Keyingi
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center mt-6 text-gray-600">
        {filteredProducts.length > 0 && (
          <p>
            {filteredProducts.length} ta mahsulot topildi
            {selectedCategory !== "All" &&
              ` (${selectedCategory} kategoriyasida)`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
