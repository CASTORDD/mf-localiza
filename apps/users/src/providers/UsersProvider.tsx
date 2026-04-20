import { UsersContext } from "@/context/users-context";
import React, { useState } from "react";

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [usersResponse, setUsersResponse] = useState(null);

  return (
    <UsersContext.Provider
      value={{ userId, setUserId, usersResponse, setUsersResponse }}
    >
      {children}
    </UsersContext.Provider>
  );
};
