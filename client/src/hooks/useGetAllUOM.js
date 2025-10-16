import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchUOMList = async () => {
  const { data, status } = await request("/misc/getAllUOM", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch UOM list");
  }
  return data || [];
};

export default function useGetAllUOM() {
  const queryClient = useQueryClient();

  const {
    data: uomData = [],
    isLoading,
    isError,
    error,
    refetch: fetchUOMs,
    isFetching,
  } = useQuery({
    queryKey: ["uoms"],
    queryFn: fetchUOMList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    uomData,
    isLoading,
    isError,
    error,
    fetchUOMs,
    isFetching,
    invalidateUOMs: () => queryClient.invalidateQueries(["uoms"]),
  };
}
