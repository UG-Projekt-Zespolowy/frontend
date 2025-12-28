"use client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { SignOut } from "./signout";

export function SignIn() {
    const { data: session, status } = useSession();
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isLoading = status === "loading";

    const handleSignIn = async () => {
        setIsSigningIn(true);
        setError(null);
        try {
            await signIn("keycloak");
        } catch (error) {
            console.error("Sign in error:", error);
            setError("Failed to sign in. Please try again.");
        } finally {
            setIsSigningIn(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (session) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
                <div className="flex flex-col items-center gap-4">
                    <div className="text-white text-xl">
                        User: {session.user?.email || session.user?.name || "User"}
                    </div>
                    <SignOut />
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={handleSignIn}
                    disabled={isSigningIn}
                    aria-label="Sign in with Keycloak"
                    className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center gap-2"
                >
                    {isSigningIn && (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {isSigningIn ? "Signing in..." : "Login with Keycloak"}
                </button>
                {error && (
                    <div className="text-red-200 text-sm bg-red-900/50 px-4 py-2 rounded-lg" role="alert">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}
