const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5555";

export const getUsers = async (page: number, limit: number) => {
  const response = await fetch(
    `${API_URL}/users?_page=${page}&_per_page=${limit}`,
  );

  if (!response.ok) {
    return { data: null, error: response.statusText, code: response.status };
  }

  return response.json();
};
