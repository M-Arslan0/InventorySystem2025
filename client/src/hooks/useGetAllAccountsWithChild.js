import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchAccountList = async () => {
  const { data, status } = await request("/account/getAllAccountsWithChilds", "GET");
  console.log(data)
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch accounts");
  }
  return data || [];
};

export default function useGetAllAccountsWithChild() {
  const queryClient = useQueryClient();

  const {
    data: accountChildData = [],
    isLoading,
    isError,
    error,
    refetch: fetchAccountsWithChilds,
    isFetching,
  } = useQuery({
    queryKey: ["accountsWithChild"],
    queryFn: fetchAccountList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    accountChildData,
    isLoading,
    isError,
    error,
    fetchAccountsWithChilds,
    isFetching,
    invalidateAccounts: () => queryClient.invalidateQueries(["accountswithChild"]),
  };
}
