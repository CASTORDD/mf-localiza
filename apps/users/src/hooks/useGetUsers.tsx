import { getUsers } from "@/services/users-services";
import { useQuery } from "@tanstack/react-query";
import useUsers from "./useUsers";
import { useEffect } from "react";

interface UseGetUserParams {
  page: number;
  per: number;
  role?: string;
  status?: string;
  name?: string;
  email?: string;
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ["USER_LIST", page, per, role, status, name, email],
    queryFn: () => getUsers(page, per, role, status, name, email),
  });

  useEffect(() => {
    if (data && !("error" in data)) {
      setUsersResponse(data);
      return;
    }

    if (isError) {
      setUsersResponse(null);
    }
  }, [data, isError, setUsersResponse]);

  return { data, isLoading, isError };
}
