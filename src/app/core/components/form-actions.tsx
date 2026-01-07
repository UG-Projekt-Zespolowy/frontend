"use client";

import { type ReactNode } from "react";

interface FormActionsProps {
    readonly primaryAction: ReactNode;
    readonly secondaryAction?: ReactNode;
}

export function FormActions({ primaryAction, secondaryAction }: FormActionsProps) {
    return (
        <div className="flex gap-3 pt-2">
            {primaryAction}
            {secondaryAction}
        </div>
    );
}
