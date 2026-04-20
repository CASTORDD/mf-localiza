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

const MOCK_USERS = [
  {
    id: "001c45ae-8f0a-43b0-bf8a-5c4403797ccf",
    name: "Usuario 344",
    email: "usuario344_1776553999@example.com",
    cpf: "77886180685",
    role: "operator",
    status: "pending",
    department: "it",
    createdAt: "2023-01-29 09:09:22.640568",
    lastLogin: "2025-08-10 19:49:06.455388",
  },
  {
    id: "001c45ae-8f0a-43b0-bf8a-5c4403797ccf",
    name: "Usuario 344",
    email: "usuario344_1776553999@example.com",
    cpf: "77886180685",
    role: "operator",
    status: "pending",
    department: "it",
    createdAt: "2023-01-29 09:09:22.640568",
    lastLogin: "2025-08-10 19:49:06.455388",
  },
  {
    id: "001c45ae-8f0a-43b0-bf8a-5c4403797ccf",
    name: "Usuario 344",
    email: "usuario344_1776553999@example.com",
    cpf: "77886180685",
    role: "operator",
    status: "pending",
    department: "it",
    createdAt: "2023-01-29 09:09:22.640568",
    lastLogin: "2025-08-10 19:49:06.455388",
  },
  {
    id: "001c45ae-8f0a-43b0-bf8a-5c4403797ccf",
    name: "Usuario 344",
    email: "usuario344_1776553999@example.com",
    cpf: "77886180685",
    role: "operator",
    status: "pending",
    department: "it",
    createdAt: "2023-01-29 09:09:22.640568",
    lastLogin: "2025-08-10 19:49:06.455388",
  },
];

export default function UsersList() {
  return (
    <Table>
      <TableCaption>
        Total users <strong>{MOCK_USERS.length}</strong>.
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
        {MOCK_USERS.map((user) => (
          <TableRow key={user.id}>
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
