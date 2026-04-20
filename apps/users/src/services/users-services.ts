const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5555";

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users?_page=1&_per_page=10`);

  if (!response.ok) {
    return { data: null, error: response.statusText, code: response.status };
  }

  return response.json();
};
