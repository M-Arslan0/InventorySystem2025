import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchProducts = async () => {
  const { data, status } = await request("/product/getAllProducts", "GET");
  if (status !== 200) throw new Error(data?.message || "Failed to fetch products");
  return data || [];
};

export default function useGetAllProducts() {
  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch:refetchProduct,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    products,
    isLoading,
    isError,
    error,
    refetchProduct,
    isFetching,
    invalidateProducts: () => queryClient.invalidateQueries(["products"]),
  };
}
