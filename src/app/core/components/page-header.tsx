"use client";

import { type ReactNode } from "react";

interface PageHeaderProps {
    readonly title: string;
    readonly actions?: ReactNode;
}

export function PageHeader({ title, actions }: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">{title}</h1>
            {actions && <div className="flex gap-3">{actions}</div>}
        </div>
    );
}

