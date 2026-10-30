import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

// --- Template: copy this file per resource. Change types, keys, and calls. ---

export type Role = "ADMIN" | "CEO" | "HR";

export type User = {
  id: string;
  email: string;
  role: Role;
  active: boolean;
};

export type CreateUserInput = Pick<User, "email" | "role">;

export const userKeys = {
  all: ["users"] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: async () => (await client.get<User[]>(endpoints.users)).data,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateUserInput) =>
      (await client.post<User>(endpoints.users, input)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
}
