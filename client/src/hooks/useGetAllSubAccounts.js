import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchSubAccountList = async () => {
  const { data, status } = await request("/subAccount/getAllSubAccounts", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch sub-accounts");
  }
  return data.accounts || [];
};

export default function useGetAllSubAccounts() {
  const queryClient = useQueryClient();

  const {
    data: subAccountData = [],
    isLoading,
    isError,
    error,
    refetch: fetchSubAccounts,
    isFetching,
  } = useQuery({
    queryKey: ["subAccounts"],
    queryFn: fetchSubAccountList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    subAccountData,
    isLoading,
    isError,
    error,
    fetchSubAccounts,
    isFetching,
    invalidateSubAccounts: () => queryClient.invalidateQueries(["subAccounts"]),
  };
}
