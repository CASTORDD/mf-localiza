const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5555";

export const getUsers = async (
  page: number,
  limit: number,
  role?: string,
  status?: string,
  name?: string,
  email?: string,
) => {
  const response = await fetch(
    `${API_URL}/users?${role ? `role:eq=${role}` : ""}${status ? `&status:eq=${status}` : ""}${name ? `&name:contains=${name}` : ""}${email ? `&email:contains=${email}` : ""}&_page=${page}&_per_page=${limit}`,
  );

  if (!response.ok) {
    return { data: null, error: response.statusText, code: response.status };
  }

  return response.json();
};
