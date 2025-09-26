// Product filters component with categories, search, and sort
import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { SortOption } from "../../../types";
import ProductButton from "../../ui/ProductButton";

interface ProductFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
}) => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "popularity", label: "Mashhurlik" },
    { value: "newest", label: "Yangi" },
    { value: "price-asc", label: "Narx: Pastdan yuqoriga" },
    { value: "price-desc", label: "Narx: Yuqoridan pastga" },
  ];

  return (
    <div className="mb-8">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <ProductButton
            key={category}
            variant={activeCategory === category ? "primary" : "secondary"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            aria-pressed={activeCategory === category}
            className="rounded-full"
          >
            {category}
          </ProductButton>
        ))}
      </div>

      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Mahsulotlarni qidiring..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            aria-label="Mahsulotlarni qidirish"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            aria-label="Saralash usuli"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
