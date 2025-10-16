import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

// ✅ Fetch Function
const fetchBrandList = async () => {
  const { data, status } = await request("/misc/getAllBrand", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch brands");
  }
  return data || [];
};

// ✅ Hook Definition
export default function useGetAllBrands() {
  const queryClient = useQueryClient();

  const {
    data: brandData = [],
    isLoading,
    isError,
    error,
    refetch: fetchBrands,
    isFetching,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrandList,
    staleTime: 5 * 60 * 1000, // 5 min
    cacheTime: 30 * 60 * 1000, // 30 min
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    brandData,
    isLoading,
    isError,
    error,
    fetchBrands,
    isFetching,
    invalidateBrands: () => queryClient.invalidateQueries(["brands"]),
  };
}
