import { getUsers, ApiError } from "@/services/users-services";
import { useQuery } from "@tanstack/react-query";
import useUsers from "./useUsers";
import { useEffect } from "react";

interface UseGetUserParams {
  page: number;
  per: number;
  role?: string | null;
  status?: string | null;
  name?: string | null;
  email?: string | null;
}

export default function useGetUsers({
  page,
  per,
  role,
  status,
  name,
  email,
}: UseGetUserParams) {
  const { setUsersResponse } = useUsers();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["USER_LIST", page, per, role, status, name, email],
    queryFn: () => getUsers(page, per, role, status, name, email),
    retry: (failureCount, err) => {
      if (err instanceof ApiError && err.code < 500) return false;
      return failureCount < 2;
    },
  });

  useEffect(() => {
    if (data) {
      setUsersResponse(data);
      return;
    }

    if (isError) {
      setUsersResponse(null);
    }
  }, [data, isError, setUsersResponse]);

  return { data, isLoading, isError, error, refetch };
}
