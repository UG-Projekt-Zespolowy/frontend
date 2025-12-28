"use client";
import { signOut } from "next-auth/react";

export function SignOut() {
    const handleSignOut = async () => {
        try {
            await signOut({ callbackUrl: "/" });
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            aria-label="Sign out"
            className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 hover:cursor-pointer transition-colors duration-300"
        >
            Log out
        </button>
    );
}

