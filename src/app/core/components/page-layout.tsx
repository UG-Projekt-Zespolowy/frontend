"use client";

import { type ReactNode } from "react";
import { Sidebar } from "@/app/core/components/sidebar";
import { useSidebar } from "@/app/core/contexts/sidebar-context";
import { SIDEBAR_PADDING } from "@/app/core/utils/sidebar.utils";

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

const MAX_WIDTH_VALUES: Readonly<Record<MaxWidth, string>> = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
    "4xl": "896px",
    "5xl": "1280px",
    "7xl": "1280px",
} as const;

export function PageLayout({ children, maxWidth = "5xl" }: PageLayoutProps) {
    const { isCollapsed } = useSidebar();
    const maxWidthValue = MAX_WIDTH_VALUES[maxWidth];

    return (
        <div className="min-h-screen bg-linear-to-r from-purple-500 to-indigo-600 p-6">
            <Sidebar />
            <div
                className={`${MAX_WIDTH_CLASSES[maxWidth]} transition-all duration-300 ${isCollapsed ? `mx-auto ${SIDEBAR_PADDING.COLLAPSED}` : ""}`}
                style={
                    !isCollapsed
                        ? {
                            marginLeft: `max(calc((100% - ${maxWidthValue}) / 2), calc(20vw + 1.5rem))`,
                            marginRight: "auto",
                        } as React.CSSProperties
                        : undefined
                }
            >
                {children}
            </div>
        </div>
    );
}

