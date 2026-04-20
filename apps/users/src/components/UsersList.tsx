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
import { ListIcon } from "lucide-react";
import useGetUsers from "@/hooks/useGetUsers";
import Loader from "./loader";
import { usePagination } from "@/hooks/usepagination";
import Pagination from "./pagination";
import useUsers from "@/hooks/useUsers";
import UserDetails from "./user-details";

export default function UsersList() {
  const { page, per } = usePagination();
  const { userId, setUserId } = useUsers();

  const { data, isLoading, isError } = useGetUsers({ page, per });

  if (isLoading) return <Loader />;
  if (isError) {
    return <div>Error occurred while fetching users.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
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
          {data?.data.map((user) => (
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
      {userId && <UserDetails />}
    </div>
  );
}
