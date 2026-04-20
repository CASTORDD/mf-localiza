import { getUsers } from "@/services/users-services";
import { useQuery } from "@tanstack/react-query";
import useUsers from "./useUsers";
import { useEffect } from "react";

interface UseGetUserParams {
  page: number;
  per: number;
}

export default function useGetUsers({ page, per }: UseGetUserParams) {
  const { setUsersResponse } = useUsers();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["USER_LIST", page, per],
    queryFn: () => getUsers(page, per),
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
