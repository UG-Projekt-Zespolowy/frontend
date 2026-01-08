"use client";

interface FormErrorProps {
    readonly message: string;
}

export function FormError({ message }: FormErrorProps) {
    return (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            {message}
        </div>
    );
}
