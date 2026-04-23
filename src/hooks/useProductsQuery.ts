import { useQuery } from "@tanstack/react-query";
import { fetchProducts, ProductDto } from "@/api/productApi";

export function useProductsQuery() {
  return useQuery<ProductDto[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

