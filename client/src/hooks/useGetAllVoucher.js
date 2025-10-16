import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchVouchers = async () => {
  const { data, status } = await request("/voucher/getAllVouchers", "GET");
  if (status !== 200) throw new Error(data?.message || "Failed to fetch vouchers");
  return data || [];
};

export default function useGetAllVouchers() {
  const queryClient = useQueryClient();

  const {
    data: voucherData = [],
    isLoading,
    isError,
    error,
    refetch: fetchVouchersList,
  } = useQuery({
    queryKey: ["vouchers"],
    queryFn: fetchVouchers,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    voucherData,
    isLoading,
    isError,
    error,
    fetchVouchersList,
    invalidateVouchers: () => queryClient.invalidateQueries(["vouchers"]),
  };
}
