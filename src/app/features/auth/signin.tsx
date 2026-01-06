"use client";
import { signIn, useSession } from "next-auth/react";
import { SignOut } from "@/app/features/auth/signout";

export function SignIn() {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    const handleSignIn = async () => {
        try {
            await signIn("keycloak", { callbackUrl: "/projects" });
        } catch (error) {
            console.error("Sign in error:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-purple-500 to-indigo-600">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (session) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-purple-500 to-indigo-600">
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
        <div className="flex min-h-screen items-center justify-center bg-linear-to-r from-purple-500 to-indigo-600">
            <button
                onClick={handleSignIn}
                className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:bg-purple-100 hover:cursor-pointer transition-colors duration-300"
            >
                Login with Keycloak
            </button>
        </div>
    );
}
