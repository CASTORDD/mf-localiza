import { getUsers } from "@/services/users-services";
import { useQuery } from "@tanstack/react-query";

export default function useGetUsers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["USER_LIST"],
    queryFn: () => getUsers(),
  });

  return { data, isLoading, isError };
}
