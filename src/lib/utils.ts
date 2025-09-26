// Utility functions for the application
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Product } from '../types';

// Merge Tailwind classes with clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Paginate array of items
export function paginate<T>(array: T[], page: number, pageSize: number): T[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
}

// Format numbers with locale-specific formatting
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('uz-UZ').format(num);
}

// Format currency in Uzbek som
export function formatCurrency(amount: number): string {
  return `${formatNumber(amount)} so'm`;
}

// Debounce function for search input
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Filter products by category and search query
export function filterProducts(
  products: Product[],
  category: string,
  searchQuery: string
): Product[] {
  let filtered = products;

  // Filter by category
  if (category !== 'All') {
    filtered = filtered.filter(product => product.category === category);
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  return filtered;
}

// Sort products by different criteria
export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'popularity':
      return sorted.sort((a, b) => b.views - a.views);
    case 'newest':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt || '');
        const dateB = new Date(b.createdAt || '');
        return dateB.getTime() - dateA.getTime();
      });
    case 'price-asc':
      return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    case 'price-desc':
      return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    default:
      return sorted;
  }
}

// Get unique categories from products
export function getCategories(products: Product[]): string[] {
  const categories = products.map(product => product.category);
  return ['All', ...Array.from(new Set(categories))];
}

// Truncate text to specified length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}