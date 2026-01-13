"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
    readonly error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ error, ...props }, ref) => {
        return (
            <input
                ref={ref}
                {...props}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 placeholder:text-gray-500 ${error ? "border-red-300" : "border-gray-300"
                    }`}
            />
        );
    }
);

FormInput.displayName = "FormInput";
