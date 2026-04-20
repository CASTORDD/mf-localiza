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

export default function UsersList() {
  const { data, isLoading, isError } = useGetUsers();

  if (isLoading) return <Loader />;
  if (isError) {
    return <div>Error occurred while fetching users.</div>;
  }

  return (
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
                  console.log(user.id);
                }}
              >
                <ListIcon className="size-5" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
