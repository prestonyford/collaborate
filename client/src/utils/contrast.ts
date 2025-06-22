export function shouldUseBlackText(hex: string): boolean;
export function shouldUseBlackText(r: number, g: number, b: number): boolean;
export function shouldUseBlackText(a: number | string, b?: number, c?: number): boolean {
		if (typeof a === 'string') {
			const { r, g, b: blue } = hexToRgb(a);
			return shouldUseBlackText(r, g, blue);
		}
		const red = a!;
		const green = b!;
		const blue = c!;
		const bgLum = luminance(red, green, blue);

		const blackContrast = (bgLum + 0.05) / 0.05
		const whiteContrast = 1.05 / (bgLum + 0.05)

		// Bias towards more white text
		const fudgeFactor = 3.05;
		return blackContrast > whiteContrast * fudgeFactor;
}

function luminance(r: number, g: number, b: number ) {
	const a = [r, g, b].map(v => {
		v /= 255
		return v <= 0.03928
			? v / 12.92
			: Math.pow((v + 0.055) / 1.055, 2.4)
	})
	return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

function hexToRgb(hex: string) {
	hex = hex.replace('#', '')
	if (hex.length === 3) {
		hex = hex.split('').map(c => c + c).join('')
	}
	const bigint = parseInt(hex, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255
	return { r, g, b }
}
