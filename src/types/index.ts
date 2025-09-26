// Product and related TypeScript interfaces

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  views: number;
  likes: number;
  badge?: 'Pro' | 'Free' | 'New';
  price?: number;
  duration?: string;
  language?: string;
  createdAt?: string; // For sorting by newest
}

export interface ProductFilters {
  category: string;
  search: string;
  sort: 'popularity' | 'newest' | 'price-asc' | 'price-desc';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export type SortOption = 'popularity' | 'newest' | 'price-asc' | 'price-desc';

export interface UseProductsReturn {
  products: Product[];
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  search: string;
  setSearch: (search: string) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  page: number;
  setPage: (page: number) => void;
  hasMore: boolean;
  loadMore: () => void;
  resetFilters: () => void;
  totalProducts: number;
  filteredProducts: Product[];
}
