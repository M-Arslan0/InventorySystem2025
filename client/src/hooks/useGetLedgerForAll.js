import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchAllCustomerLedgers = async () => {
  const { data, status } = await request(
    "/ledgerBook/getAllCustomersLedgerSummary",
    "GET"
  );

  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch customer ledgers");
  }

  return data.customers || [];
};

export default function useGetAllCustomersLedgerSummary() {
  const queryClient = useQueryClient();

  const {
    data: customerLedgers = [],
    isLoading,
    isError,
    error,
    refetch: fetchCustomerLedgers,
  } = useQuery({
    queryKey: ["customerLedgers"],
    queryFn: fetchAllCustomerLedgers,
    staleTime: 5 * 60 * 1000, // 5 min
    cacheTime: 30 * 60 * 1000, // 30 min
    refetchOnWindowFocus: false,
  });

  return {
    customerLedgers,
    isLoading,
    isError,
    error,
    fetchCustomerLedgers,
    invalidateCustomerLedgers: () =>
      queryClient.invalidateQueries(["customerLedgers"]),
  };
}
