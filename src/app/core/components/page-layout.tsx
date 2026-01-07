"use client";

import { type ReactNode } from "react";
import { Sidebar } from "@/app/core/components/sidebar";
import { useSidebar } from "@/app/core/contexts/sidebar-context";
import { getSidebarPadding } from "@/app/core/utils/sidebar.utils";

type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "5xl" | "7xl";

interface PageLayoutProps {
    readonly children: ReactNode;
    readonly maxWidth?: MaxWidth;
}

const MAX_WIDTH_CLASSES: Readonly<Record<MaxWidth, string>> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "7xl": "max-w-7xl",
} as const;

export function PageLayout({ children, maxWidth = "5xl" }: PageLayoutProps) {
    const { isCollapsed } = useSidebar();

    return (
        <div className="min-h-screen bg-linear-to-r from-purple-500 to-indigo-600 p-6">
            <Sidebar />
            <div className={`${MAX_WIDTH_CLASSES[maxWidth]} mx-auto transition-all duration-300 ${getSidebarPadding(isCollapsed)}`}>
                {children}
            </div>
        </div>
    );
}

