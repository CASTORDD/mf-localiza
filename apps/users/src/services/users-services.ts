const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5555";

export class ApiError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.name = "ApiError";
  }
}

export const getUsers = async (
  page: number,
  limit: number,
  role?: string | null,
  status?: string | null,
  name?: string | null,
  email?: string | null,
) => {
  const response = await fetch(
    `${API_URL}/users?${role ? `role:eq=${role}` : ""}${status ? `&status:eq=${status}` : ""}${name ? `&name:contains=${name}` : ""}${email ? `&email:contains=${email}` : ""}&_page=${page}&_per_page=${limit}`,
  );

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return response.json();
};
