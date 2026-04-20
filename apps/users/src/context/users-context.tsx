import { createContext } from "react";
import type { User } from "@/types/user.types";

type UsersQueryResponse = {
  data: User[];
  items: number;
  next?: number | null;
  last?: number;
  [key: string]: unknown;
};

type UserContextType = {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  usersResponse: UsersQueryResponse | null;
  setUsersResponse: React.Dispatch<
    React.SetStateAction<UsersQueryResponse | null>
  >;
};

export const UsersContext = createContext<UserContextType | undefined>(
  undefined,
);
