interface LoadingStateProps {
    readonly message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
    return (
        <div className="text-center text-white py-8">
            <p>{message}</p>
        </div>
    );
}
