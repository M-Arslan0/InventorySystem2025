import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchProducts = async () => {
  const { data, status } = await request("/product/getAllProductsForSales", "GET");
  if (status !== 200) throw new Error(data?.message || "Failed to fetch products");
  return data || [];
};

export default function useGetAllProductsForSales() {
  const queryClient = useQueryClient();

  const {
    data: productsForSales = [],
    isLoading,
    isError,
    error,
    refetch:refetchProductsForSales,
    isFetching,
  } = useQuery({
    queryKey: ["productsForSales"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    productsForSales,
    isLoading,
    isError,
    error,
    refetchProductsForSales,
    isFetching,
    invalidateProductsForSales: () => queryClient.invalidateQueries(["productsForSales"]),
  };
}
