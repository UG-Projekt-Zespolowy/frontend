"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useSidebar } from "@/app/core/contexts/sidebar-context";
import { SIDEBAR_WIDTH } from "@/app/core/utils/sidebar.utils";
import { getUserInitials, getDisplayName } from "@/app/features/board/utils/user.utils";

export function Sidebar() {
    const { data: session } = useSession();
    const { isCollapsed, setCollapsed } = useSidebar();

    const toggleCollapse = () => {
        setCollapsed(!isCollapsed);
    };

    const handleSignOut = async () => {
        try {
            await signOut({ callbackUrl: "/" });
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    if (!session?.user) {
        return null;
    }

    const user = session.user;
    const displayName = getDisplayName(user.name, user.email);
    const initials = getUserInitials(displayName);

    return (
        <div
            className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-sm border-r border-white/30 shadow-xl transition-all duration-300 z-50 ${isCollapsed ? SIDEBAR_WIDTH.COLLAPSED : SIDEBAR_WIDTH.EXPANDED}`}
        >
            <div className="flex flex-col h-full p-4">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg overflow-hidden">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={displayName}
                                width={80}
                                height={80}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            initials
                        )}
                    </div>
                    {!isCollapsed && (
                        <div className="text-center">
                            <p className="font-semibold text-gray-800 text-lg">
                                {displayName}
                            </p>
                            {user.email && user.name && (
                                <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex-1" />

                <div className="flex flex-col gap-2">
                    <button
                        onClick={toggleCollapse}
                        className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium flex items-center justify-center gap-2"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? (
                            <span className="text-xl">→</span>
                        ) : (
                            <>
                                <span>←</span>
                                <span>Collapse</span>
                            </>
                        )}
                    </button>
                    {!isCollapsed ? (
                        <button
                            onClick={handleSignOut}
                            aria-label="Sign out"
                            className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300"
                        >
                            Log out
                        </button>
                    ) : (
                        <button
                            onClick={handleSignOut}
                            className="w-full h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center text-xl"
                            aria-label="Sign out"
                            title="Log out"
                        >
                            🚪
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

