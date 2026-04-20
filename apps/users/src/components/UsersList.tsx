import React from "react";

const MOCK_USERS = [
  { id: 1, name: "Ana García", email: "ana@example.com", role: "Admin" },
  { id: 2, name: "Carlos López", email: "carlos@example.com", role: "Editor" },
  {
    id: 3,
    name: "María Rodríguez",
    email: "maria@example.com",
    role: "Viewer",
  },
];

export default function UsersList() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Users List</h2>
    </div>
  );
}

const th: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px 12px",
  textAlign: "left",
};

const td: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px 12px",
};
