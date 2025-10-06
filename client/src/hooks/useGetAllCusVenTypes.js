import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchCusVenTypeList = async () => {
  const { data, status } = await request("/misc/getAllCusVenType", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch customer/vendor types");
  }
  return data;
};

export default function useGetAllCusVenTypes() {
  const queryClient = useQueryClient();

  const {
    data: typeData = [],
    isLoading,
    isError,
    error,
    refetch: fetchCusVenTypes,
    isFetching,
  } = useQuery({
    queryKey: ["cusVenTypes"],
    queryFn: fetchCusVenTypeList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    typeData,
    isLoading,
    isError,
    error,
    fetchCusVenTypes,
    isFetching,
    invalidateCusVenTypes: () => queryClient.invalidateQueries(["cusVenTypes"]),
  };
}
