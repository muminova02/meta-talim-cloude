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
  interactiveExercises?: InteractiveExercise[];
}

export interface InteractiveExercise {
  id: string;
  type: 'quiz' | 'practical' | 'simulation' | 'experiment';
  title: string;
  description: string;
  icon: string;
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

// Product Preview specific interfaces
export interface ProductDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  media: { id: string; type: 'image'|'video'|'3d'; src: string; poster?: string }[];
  author: { id: string; name: string; avatar?: string };
  publishedAt: string; // ISO
  views: number;
  likes: number;
  price?: number;
  duration?: string;
  resources?: { label: string; url: string; type?: string; isDownload?: boolean }[];
  usedBy?: string[]; // organization names
  comments?: Comment[];
  relatedItems?: RelatedItem[];
  interactiveExercises?: InteractiveExercise[];
}

export interface Comment {
  id: string;
  author: { name: string; avatar?: string };
  content: string;
  createdAt: string;
  likes: number;
}

export interface RelatedItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  views: number;
  likes: number;
}

export interface UseProductPreviewReturn {
  data: ProductDetail | null;
  loading: boolean;
  error: string | null;
  toggleBookmark: () => void;
  copyLink: () => void;
  openShare: () => void;
  isBookmarked: boolean;
}
