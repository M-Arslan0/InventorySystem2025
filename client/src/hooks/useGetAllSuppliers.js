import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchSupplierList = async () => {
  const { data, status } = await request("/supplier/getAllSuppliers", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch suppliers");
  }
  return data || [];
};

export default function useGetAllSuppliers() {
  const queryClient = useQueryClient();

  const {
    data: supplierData = [],
    isLoading,
    isError,
    error,
    refetch: fetchSuppliers,
    isFetching,
  } = useQuery({
    queryKey: ["suppliers"],
    queryFn: fetchSupplierList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    supplierData,
    isLoading,
    isError,
    error,
    fetchSuppliers,
    isFetching,
    invalidateSuppliers: () => queryClient.invalidateQueries(["suppliers"]),
  };
}
