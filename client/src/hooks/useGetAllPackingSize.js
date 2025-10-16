import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchPackingSizeList = async () => {
  const { data, status } = await request("/misc/getAllPackingSize", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch packing sizes");
  }
  return data || [];
};

export default function useGetAllPackingSize() {
  const queryClient = useQueryClient();

  const {
    data: packingSizeData = [],
    isLoading,
    isError,
    error,
    refetch: fetchPackingSizes,
    isFetching,
  } = useQuery({
    queryKey: ["packingSizes"],
    queryFn: fetchPackingSizeList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    packingSizeData,
    isLoading,
    isError,
    error,
    fetchPackingSizes,
    isFetching,
    invalidatePackingSizes: () => queryClient.invalidateQueries(["packingSizes"]),
  };
}
