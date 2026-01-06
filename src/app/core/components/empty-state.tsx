interface EmptyStateProps {
    readonly message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
    return (
        <div className="text-center text-white py-8">
            <p>{message}</p>
        </div>
    );
}
