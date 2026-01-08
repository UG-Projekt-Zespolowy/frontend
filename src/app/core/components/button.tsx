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
    readonly type?: "button" | "submit" | "reset";
    readonly disabled?: boolean;
}

export function Button({
    children,
    href,
    onClick,
    variant = "secondary",
    className = "",
    ariaLabel,
    type = "button",
    disabled = false,
}: ButtonProps) {
    const baseStyles = "px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
        primary: "bg-white text-purple-700 hover:bg-purple-50 hover:cursor-pointer",
        secondary: "bg-white/90 backdrop-blur-sm text-purple-700 hover:bg-purple-50 border border-white/20 hover:cursor-pointer",
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
        <button
            onClick={onClick}
            className={combinedClassName}
            aria-label={ariaLabel}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

