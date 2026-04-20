import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import useUserDetail from "@/hooks/useUsers";

export default function UserDetails() {
  const { userId, setUserId, usersResponse } = useUserDetail();

  const isMobile = useIsMobile();
  const selectedUser = usersResponse?.data.find((user) => user.id === userId);

  if (!selectedUser) {
    return (
      <Drawer
        open={!!userId}
        onOpenChange={(isOpen) => !isOpen && setUserId(null)}
        direction={isMobile ? "bottom" : "right"}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>User Details</DrawerTitle>
            <DrawerDescription>
              Information recorded about the user.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">Unable to load details for this user.</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer
      open={!!userId}
      onOpenChange={(isOpen) => !isOpen && setUserId(null)}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>User Details</DrawerTitle>
          <DrawerDescription>
            Information recorded about the user.
          </DrawerDescription>
        </DrawerHeader>
        <div className="mt-4 space-y-2 text-left px-4 pb-10">
          <p className="flex flex-col">
            <strong>Name:</strong>
            <span className="text-slate-600">{selectedUser.name}</span>
          </p>
          <p className="flex flex-col">
            <strong>CPF:</strong>
            <span className="text-slate-600">{selectedUser.cpf}</span>
          </p>
          <p className="flex flex-col">
            <strong>Email:</strong>
            <span className="text-slate-600">{selectedUser.email}</span>
          </p>
          <p className="flex flex-col">
            <strong>Role:</strong>
            <span className="text-slate-600">{selectedUser.role}</span>
          </p>
          <p className="flex flex-col">
            <strong>Status:</strong>
            <span className="text-slate-600">{selectedUser.status}</span>
          </p>
          <p className="flex flex-col">
            <strong>CreatedAt:</strong>
            <span className="text-slate-600">{selectedUser.createdAt}</span>
          </p>
          <p className="flex flex-col">
            <strong>Last Login:</strong>
            <span className="text-slate-600">{selectedUser.lastLogin}</span>
          </p>
        </div>
        <DrawerClose className="absolute max-md:hidden top-4 right-4">
          <Button size="icon" variant="ghost" className="cursor-pointer">
            <XIcon className="size-5" />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
