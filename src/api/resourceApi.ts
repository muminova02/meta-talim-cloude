import { apiGet, shouldUseFakeApi } from "./http";
import { fakeFetchProductResources } from "./fakeBackend";

export interface ProductResourceDto {
  id: number;
  product_id: number;
  label: string;
  url: string;
  type: string;
}

export async function fetchProductResources(
  productId: string | number,
): Promise<ProductResourceDto[]> {
  try {
    return await apiGet<ProductResourceDto[]>(`/products/${productId}/resources`);
  } catch (error) {
    if (shouldUseFakeApi(error)) {
      return fakeFetchProductResources(productId);
    }
    throw error;
  }
}

