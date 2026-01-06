import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
import { BACKEND_URL } from "@/app/core/constants/api.constants";

export async function getAccessToken(): Promise<string | null> {
    const session = await getSession();
    return (session as Session & { accessToken?: string })?.accessToken || null;
}

export async function fetchWithAuth(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = await getAccessToken();
    
    if (!token) {
        throw new Error("No access token available");
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
    };

    return fetch(`${BACKEND_URL}${endpoint}`, {
        ...options,
        headers,
    });
}

