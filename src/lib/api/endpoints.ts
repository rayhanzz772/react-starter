// Every API path lives here, relative to VITE_API_URL. Add resources here only.
export const endpoints = {
  users: "/users",
  user: (id: string) => `/users/${id}`,
};
