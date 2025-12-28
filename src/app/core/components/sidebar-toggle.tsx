"use client";

import { useSidebar } from "@/app/core/contexts/sidebar-context";

export function SidebarToggle() {
    const { isOpen, toggle } = useSidebar();

    return (
        <button
            onClick={toggle}
            className="fixed top-4 right-4 z-50 w-12 h-12 bg-white/95 backdrop-blur-sm text-purple-700 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all flex items-center justify-center border border-white/30"
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
            {isOpen ? (
                <span className="text-xl">✕</span>
            ) : (
                <span className="text-xl">☰</span>
            )}
        </button>
    );
}
