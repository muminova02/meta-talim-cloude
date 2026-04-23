import { apiGet, shouldUseFakeApi } from "./http";
import {
  fakeFetchProductById,
  fakeFetchProductProcess,
  fakeFetchProducts,
} from "./fakeBackend";

// Backend DTOs
export interface ProductDto {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  thumbnail?: string | null;
  video_url?: string | null;
  model_3d_url?: string | null;
  embedded_3d?: string | null;
  views?: number;
  likes?: number;
  language?: string;
  created_at: string;
}

export interface ProductResourceDto {
  id: number;
  product_id: number;
  label: string;
  url: string;
  type: string;
  is_download?: boolean;
}

export interface ProductDetailDto extends ProductDto {
  resources: ProductResourceDto[];
}

export interface ChapterDto {
  id: number;
  title: string;
  type: string;
  is_completed: boolean;
}

export interface QuestionDto {
  id: number;
  question: string;
  options?: string | null;
  correct_answer: string;
}

export interface ExerciseDto {
  id: number;
  type: string;
  title: string;
  questions: QuestionDto[];
}

export interface SubtitleDto {
  id: number;
  time: number;
  text: string;
}

export interface ProductProcessDto extends ProductDto {
  chapters: ChapterDto[];
  exercises: ExerciseDto[];
  subtitles: SubtitleDto[];
}

export async function fetchProducts(): Promise<ProductDto[]> {
  try {
    return await apiGet<ProductDto[]>("/products");
  } catch (error) {
    if (shouldUseFakeApi(error)) {
      return fakeFetchProducts();
    }
    throw error;
  }
}

export async function fetchProductById(
  id: string | number,
): Promise<ProductDetailDto> {
  try {
    return await apiGet<ProductDetailDto>(`/products/${id}`);
  } catch (error) {
    if (shouldUseFakeApi(error)) {
      return fakeFetchProductById(id);
    }
    throw error;
  }
}

export async function fetchProductProcess(
  id: string | number,
): Promise<ProductProcessDto> {
  try {
    return await apiGet<ProductProcessDto>(`/product-process/${id}`);
  } catch (error) {
    if (shouldUseFakeApi(error)) {
      return fakeFetchProductProcess(id);
    }
    throw error;
  }
}

