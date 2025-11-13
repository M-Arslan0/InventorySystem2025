import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI";

// 🔹 API call function
const fetchCompany = async () => {
  const { data, status } = await request("/company/getCompany", "GET");
  if (status !== 200) {
    throw new Error(data?.message || "Failed to fetch company data");
  }
  return data || {}; // returns { exists, company }
};

// 🔹 Custom Hook
export default function useGetCompany() {
  const queryClient = useQueryClient();

  const {
    data: companyResponse = {},
    isLoading,
    isError,
    error,
    refetch: fetchCompanyData,
    isFetching,
  } = useQuery({
    queryKey: ["companyData"],
    queryFn: fetchCompany,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    companyData: companyResponse.company || null,
    exists: companyResponse.exists || false,
    isLoading,
    isError,
    error,
    isFetching,
    fetchCompanyData,
    invalidateCompany: () => queryClient.invalidateQueries(["companyData"]),
  };
}
