"use client";

import { Sidebar } from "@/app/core/components";
import { useSidebar } from "@/app/core/contexts/sidebar-context";
import { getSidebarPadding } from "@/app/core/utils/sidebar.utils";
import { UserDetails } from "../features/user/user-details";

export default function UserPage() {
    const { isCollapsed } = useSidebar();

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
            <Sidebar />
            <div className={`max-w-7xl mx-auto transition-all duration-300 ${getSidebarPadding(isCollapsed)}`}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                        User Details
                    </h1>
                </div>
                <UserDetails />
            </div>
        </div>
    );
}

