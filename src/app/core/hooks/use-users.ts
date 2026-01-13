"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { fetchWithAuth } from "@/app/core/api/api-client";
import type { User } from "@/app/core/types";

export function useCurrentUser() {
    const { data: session } = useSession();
    const email = session?.user?.email;

    return useQuery<User>({
        queryKey: ["user", "current", email],
        queryFn: async () => {
            if (!email) {
                throw new Error("No email available in session");
            }

            const response = await fetchWithAuth(`/api/v1/users/username/${encodeURIComponent(email)}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch user: ${response.status}`);
            }

            return response.json();
        },
        enabled: !!email,
    });
}

