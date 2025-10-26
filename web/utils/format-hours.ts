export function formatHours(duration: number) {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}min`;
}
