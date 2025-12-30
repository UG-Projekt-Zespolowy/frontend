"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SidebarContextType {
    isOpen: boolean;
    isCollapsed: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
    setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const isOpen = true;
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggle = () => { };
    const open = () => { };
    const close = () => {
        setIsCollapsed(false);
    };
    const setCollapsed = (collapsed: boolean) => setIsCollapsed(collapsed);

    return (
        <SidebarContext.Provider value={{ isOpen, isCollapsed, toggle, open, close, setCollapsed }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
