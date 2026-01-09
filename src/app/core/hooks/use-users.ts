"use client";

import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/app/core/api/api-client";
import type { User, PageResponse } from "@/app/core/types";

interface UseUsersState {
    data: PageResponse<User> | null;
    loading: boolean;
    error: Error | null;
}

export function useUser(id: string) {
    const [state, setState] = useState<{ data: User | null; loading: boolean; error: Error | null }>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!id) {
            setState({ data: null, loading: false, error: null });
            return;
        }

        const fetchUser = async () => {
            try {
                setState((prev) => ({ ...prev, loading: true, error: null }));
                const response = await fetchWithAuth(`/api/v1/users/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
                const data = await response.json();
                setState({ data, loading: false, error: null });
            } catch (error) {
                setState({
                    data: null,
                    loading: false,
                    error: error instanceof Error ? error : new Error("Unknown error"),
                });
            }
        };

        fetchUser();
    }, [id]);

    return state;
}
