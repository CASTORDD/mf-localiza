export const ROLES = {
  VIEWER: "viewer",
  ADMIN: "admin",
  OPERATOR: "operator",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
