// Custom hook for product filtering, search, and pagination logic
import { useState, useMemo, useCallback } from 'react';
import { Product, SortOption, UseProductsReturn } from '../types';
import { filterProducts, sortProducts, paginate } from '../lib/utils';

interface UseProductsProps {
  products: Product[];
  pageSize?: number;
}

export const useProducts = ({ products, pageSize = 9 }: UseProductsProps): UseProductsReturn => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('popularity');
  const [page, setPage] = useState(1);

  // Get unique categories
  const categories = useMemo(() => {
    const categorySet = new Set(products.map(product => product.category));
    return ['All', ...Array.from(categorySet)];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, activeCategory, search);
    return sortProducts(filtered, sort);
  }, [products, activeCategory, search, sort]);

  // Paginate filtered products
  const paginatedProducts = useMemo(() => {
    return paginate(filteredProducts, page, pageSize);
  }, [filteredProducts, page, pageSize]);

  // Check if there are more products to load
  const hasMore = useMemo(() => {
    return page * pageSize < filteredProducts.length;
  }, [page, pageSize, filteredProducts.length]);

  // Load more products
  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  }, [hasMore]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setActiveCategory('All');
    setSearch('');
    setSort('popularity');
    setPage(1);
  }, []);

  // Reset page when filters change
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((searchQuery: string) => {
    setSearch(searchQuery);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((sortOption: SortOption) => {
    setSort(sortOption);
    setPage(1);
  }, []);

  return {
    products: paginatedProducts,
    categories,
    activeCategory,
    setActiveCategory: handleCategoryChange,
    search,
    setSearch: handleSearchChange,
    sort,
    setSort: handleSortChange,
    page,
    setPage,
    hasMore,
    loadMore,
    resetFilters,
    totalProducts: filteredProducts.length,
    filteredProducts
  };
};
