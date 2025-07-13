import { useEffect, useState } from "react";

export function useAsyncWithError<T>(asyncFn: () => Promise<T>, deps: any[] = []) {
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let mounted = true;
		setLoading(true);

		asyncFn()
			.catch((err) => {
				if (mounted && err instanceof Error) setError(err);
			})
			.finally(() => {
				if (mounted) setLoading(false);
			});

		return () => {
			mounted = false;
		};
	}, deps);

	return { error, loading };
}
