"use client";

import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
    readonly children: ReactNode;
    readonly href?: string;
    readonly onClick?: () => void;
    readonly variant?: "primary" | "secondary" | "icon";
    readonly className?: string;
    readonly ariaLabel?: string;
}

export function Button({
    children,
    href,
    onClick,
    variant = "secondary",
    className = "",
    ariaLabel,
}: ButtonProps) {
    const baseStyles = "px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all font-medium";

    const variantStyles = {
        primary: "bg-white text-purple-700 hover:bg-purple-50",
        secondary: "bg-white/90 backdrop-blur-sm text-purple-700 hover:bg-white border border-white/20",
        icon: "bg-white text-purple-700 hover:bg-purple-50 flex items-center justify-center w-10 h-10 text-xl font-bold",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName} aria-label={ariaLabel}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={combinedClassName} aria-label={ariaLabel}>
            {children}
        </button>
    );
}

