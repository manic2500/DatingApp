export function handleSubscription<T>(
    onSuccess: (value: T) => void,
    onError: (error: any) => void = console.error,
    onComplete: () => void = () => console.log('Completed')
) {
    return {
        next: onSuccess,
        error: onError,
        complete: onComplete
    };
}
