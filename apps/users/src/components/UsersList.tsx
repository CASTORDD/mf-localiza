import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { ListIcon, SearchAlertIcon } from "lucide-react";
import useGetUsers from "@/hooks/useGetUsers";
import Loader from "./loader";
import { usePagination } from "@/hooks/usepagination";
import Pagination from "./pagination";
import useUsers from "@/hooks/useUsers";
import UserDetails from "./user-details";
import Filters from "./filters";
import useFilters from "@/hooks/useFilters";
import type { User } from "@/types/user.types";
import SystemMessage from "./system-messages";
import { ApiError } from "@/services/users-services";

export default function UsersList() {
  const { page, per } = usePagination();
  const { role, status, name, email } = useFilters();
  const { userId, setUserId } = useUsers();

  const { data, isLoading, isError, error, refetch } = useGetUsers({
    page,
    per,
    role,
    status,
    name,
    email,
  });

  return (
    <div className="flex flex-col gap-4">
      <Filters />

      {isError && (
        <SystemMessage type="error">
          <SearchAlertIcon className="size-8 mr-2" />
          <span>
            {error instanceof ApiError ? error.message : "Erro no servidor"}
          </span>
          <Button
            variant="outline"
            className="ml-4"
            onClick={() => refetch()}
          >
            Tentar novamente
          </Button>
        </SystemMessage>
      )}

      {isLoading && <Loader />}

      {data && (
        <>
          <Table>
            <TableCaption>
              Total users <strong>{data.items}</strong>.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((user: User) => (
                <TableRow key={`ulk-${user.id}`}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setUserId(user.id);
                      }}
                    >
                      <ListIcon className="size-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination />
        </>
      )}

      {userId && <UserDetails />}
    </div>
  );
}
