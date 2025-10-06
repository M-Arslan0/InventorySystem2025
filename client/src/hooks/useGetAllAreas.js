import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchAreaList = async () => {
  const { data, status } = await request("/misc/getAllArea", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch areas");
  }
  return data; // assuming array of areas
};

export default function useGetAllAreas() {
  const queryClient = useQueryClient();

  const {
    data: areaData = [],
    isLoading,
    isError,
    error,
    refetch: fetchAreas,
    isFetching,
  } = useQuery({
    queryKey: ["areas"], // unique cache key
    queryFn: fetchAreaList,
    staleTime: 5 * 60 * 1000, // 5 minutes (fresh cache)
    cacheTime: 30 * 60 * 1000, // 30 minutes (stored in memory)
    refetchOnWindowFocus: false, // disable auto refetch
    retry: 1, // retry once if failed
  });

  return {
    areaData,
    isLoading,
    isError,
    error,
    fetchAreas,
    isFetching,
    invalidateAreas: () => queryClient.invalidateQueries(["areas"]),
  };
}
