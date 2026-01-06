interface ErrorStateProps {
    readonly message: string;
    readonly onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="text-center text-white py-8">
            <p className="mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                    Try again
                </button>
            )}
        </div>
    );
}
