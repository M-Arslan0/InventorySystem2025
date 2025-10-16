import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

// ✅ Fetch Function
const fetchCategoryList = async () => {
  const { data, status } = await request("/misc/getAllCategory", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch categories");
  }
  return data || [];
};

// ✅ Hook Definition
export default function useGetAllCategories() {
  const queryClient = useQueryClient();

  const {
    data: categoryData = [],
    isLoading,
    isError,
    error,
    refetch: fetchCategories,
    isFetching,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryList,
    staleTime: 5 * 60 * 1000, // 5 min
    cacheTime: 30 * 60 * 1000, // 30 min
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    categoryData,
    isLoading,
    isError,
    error,
    fetchCategories,
    isFetching,
    invalidateCategories: () => queryClient.invalidateQueries(["categories"]),
  };
}
