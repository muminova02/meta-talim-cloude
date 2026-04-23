import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Heart, Clock, Search, Filter, ChevronDown } from "lucide-react";
import ProductCard from "../ui/ProductCard";
import { fetchProducts, ProductDto } from "@/api/productApi";
import { resolveApiUrl } from "@/api/http";
import type { Product } from "@/types";

function mapProductDtoToCardProduct(dto: ProductDto): Product {
  const durationMinutes =
    typeof dto.duration === "number"
      ? `${Math.round(dto.duration / 60)} minutes`
      : undefined;

  return {
    id: String(dto.id),
    title: dto.title,
    description: dto.description,
    category: dto.category,
    image: dto.thumbnail ? resolveApiUrl(dto.thumbnail) : "/images/atom_bomba.jpg",
    views: dto.views ?? 0,
    likes: dto.likes ?? 0,
    badge: undefined,
    price: 0,
    duration: durationMinutes,
    language: dto.language ?? "UZB",
    createdAt: dto.created_at,
  };
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const dtos = await fetchProducts();
        if (!mounted) return;
        setProducts(dtos.map(mapProductDtoToCardProduct));
      } catch (e) {
        if (!mounted) return;
        setLoadError("Mahsulotlarni yuklab bo'lmadi");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Categories from mock data
  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "popular":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Mahsulotlar</h1>
            <p className="mt-2 text-gray-600">
              Ta'lim uchun eng yaxshi VR, AR va 3D tajribalar
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Filtrlar
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qidirish
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Mahsulot qidirish..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategoriya
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-emerald-100 text-emerald-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category === "all" ? "Barchasi" : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tartiblash
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="newest">Eng yangi</option>
                  <option value="popular">Eng mashhur</option>
                  <option value="alphabetical">Alfavit bo'yicha</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loadError && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                {loadError}
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {filteredProducts.length} ta mahsulot topildi
                </h2>
                <p className="text-gray-600">
                  {selectedCategory !== "all" &&
                    `Kategoriya: ${selectedCategory}`}
                </p>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filtrlar
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Products Grid */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {loading && (
              <div className="py-12 text-center text-gray-600">
                Yuklanmoqda...
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Hech narsa topilmadi
                </h3>
                <p className="text-gray-600 mb-4">
                  Qidiruv shartlarini o'zgartiring yoki boshqa kalit so'zlar
                  bilan qidiring
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Filtrlarni tozalash
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
