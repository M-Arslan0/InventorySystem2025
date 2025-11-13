import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchAccountList = async () => {
  const { data, status } = await request("/account/getAllAccounts", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch accounts");
  }
  return data || [];
};

export default function useGetAllAccounts() {
  const queryClient = useQueryClient();

  const {
    data: accountData = [],
    isLoading,
    isError,
    error,
    refetch: fetchAccounts,
    isFetching,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccountList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    accountData,
    isLoading,
    isError,
    error,
    fetchAccounts,
    isFetching,
    invalidateAccounts: () => queryClient.invalidateQueries(["accounts"]),
  };
}
