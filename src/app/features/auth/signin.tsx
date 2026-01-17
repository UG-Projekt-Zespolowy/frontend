"use client";
import { signIn, useSession } from "next-auth/react";
import { SignOut } from "@/app/features/auth/signout";
import { LoginCard } from "@/app/core/components/login-card";
import { HomePageContent } from "@/app/core/components/home-page-content";

export function SignIn() {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    const handleSignIn = async () => {
        await signIn("keycloak", { callbackUrl: "/projects" });
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
                <div style={{ color: 'var(--text-white)' }} className="text-xl">Loading...</div>
            </div>
        );
    }

    if (session) {
        return (
            <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
                <div className="flex flex-col items-center gap-4 backdrop-blur-xl rounded-3xl p-12 border" 
                     style={{ 
                         background: 'var(--column-bg)', 
                         borderColor: 'var(--border-color)',
                         boxShadow: 'var(--shadow-lg)'
                     }}>
                    <div style={{ color: 'var(--text-heading)' }} className="text-xl font-semibold">
                        Welcome, {session.user?.email || session.user?.name || "User"}!
                    </div>
                    <SignOut />
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen relative overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-600">
            <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                    <HomePageContent />
                    <LoginCard onSignIn={handleSignIn} />
                </div>
            </div>
        </div>
    );
}
