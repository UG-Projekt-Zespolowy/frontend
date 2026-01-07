"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchWithAuth } from "@/app/core/api/api-client";

export function useUserSync() {
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) return;

        const syncUser = async () => {
            await fetchWithAuth("/api/v1/users");
        };

        syncUser();
    }, [session]);
}

