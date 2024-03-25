export function randInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function clamp(value: number, min: number, max: number) {
	if (value < min) return min;
	if (value > max) return max;
	return value;
}

export function cx(...classes: (string | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}
