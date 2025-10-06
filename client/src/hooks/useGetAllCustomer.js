import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchCustomerList = async () => {
  const { data, status } = await request("/customer/getAllCustomers", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch customers");
  }
  return data.customers || [];
};

export default function useGetAllCustomers() {
  const queryClient = useQueryClient();

  const {
    data: customerData = [],
    isLoading,
    isError,
    error,
    refetch: fetchCustomers,
    isFetching,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomerList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    customerData,
    isLoading,
    isError,
    error,
    fetchCustomers,
    isFetching,
    invalidateCustomers: () => queryClient.invalidateQueries(["customers"]),
  };
}
