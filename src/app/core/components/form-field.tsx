"use client";

import { type ReactNode } from "react";

interface FormFieldProps {
    readonly label: string;
    readonly required?: boolean;
    readonly error?: string;
    readonly children: ReactNode;
}

export function FormField({ label, required, error, children }: FormFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            {children}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

