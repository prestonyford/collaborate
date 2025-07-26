// useClickOutside.ts
import { useEffect } from 'react';

export function useClickOutside(
	refs: React.RefObject<HTMLElement | null>[],
	callback: () => void,
	enabled: boolean = true
) {
	useEffect(() => {
		if (!enabled) return;

		function handleClickOutside(event: MouseEvent) {
			const target = event.target as Node;
			const isOutside = refs.every(ref =>
				!ref?.current || !ref.current.contains(target)
			);

			if (isOutside) {
				callback();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [refs, callback, enabled]);
}
