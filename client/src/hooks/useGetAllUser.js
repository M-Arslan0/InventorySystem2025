// hooks/useGetAllUsers.js
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../util/fetchAPI"; // your existing request util

const fetchUsers = async () => {
  const { data, status } = await request("/user/getAllUsers", "GET");
  if (status !== 200) throw new Error(data?.message || "Failed to fetch users");
  return data.users || [];
};

export default function useGetAllUsers() {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    users,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    invalidateUsers: () => queryClient.invalidateQueries(["users"]),
  };
}
