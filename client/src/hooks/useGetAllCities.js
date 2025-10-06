import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

const fetchCityList = async () => {
  const { data, status } = await request("/misc/getAllCity", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch cities");
  }
  return data;
};

export default function useGetAllCities() {
  const queryClient = useQueryClient();

  const {
    data: cityData = [],
    isLoading,
    isError,
    error,
    refetch: fetchCities,
    isFetching,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCityList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    cityData,
    isLoading,
    isError,
    error,
    fetchCities,
    isFetching,
    invalidateCities: () => queryClient.invalidateQueries(["cities"]),
  };
}
