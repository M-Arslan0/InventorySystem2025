import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchBankList = async () => {
  const { data, status } = await request("/bank/getAllBanks", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch banks");
  }
  return data; // assuming array of banks
};

export default function useGetAllBank() {
  const queryClient = useQueryClient();

  const {
    data: bankData = [],
    isLoading,
    isError,
    error,
    refetch: fetchBanks,
    isFetching,
  } = useQuery({
    queryKey: ["banks"], // unique cache key
    queryFn: fetchBankList,
    staleTime: 5 * 60 * 1000, // 5 minutes (fresh cache)
    cacheTime: 30 * 60 * 1000, // 30 minutes (stored in memory)
    refetchOnWindowFocus: false, // disable auto refetch
    retry: 1, // retry once if failed
  });

  return {
    bankData,
    isLoading,
    isError,
    error,
    fetchBanks,
    isFetching,
    invalidateBanks: () => queryClient.invalidateQueries(["banks"]),
  };
}
