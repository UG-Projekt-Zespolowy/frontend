"use client";

import { type TextareaHTMLAttributes, forwardRef } from "react";

interface FormTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
    readonly error?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    ({ error, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                {...props}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none text-gray-900 placeholder:text-gray-500 ${error ? "border-red-300" : "border-gray-300"
                    }`}
            />
        );
    }
);

FormTextarea.displayName = "FormTextarea";

