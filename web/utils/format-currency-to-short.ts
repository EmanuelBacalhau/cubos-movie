export function formatCurrencyToShort(value?: number): string {
	if (typeof value !== 'number' || Number.isNaN(value)) return '0,00';
	const units = [
		{ label: 'T', value: 1_000_000_000_000 },
		{ label: 'B', value: 1_000_000_000 },
		{ label: 'M', value: 1_000_000 },
		{ label: 'K', value: 1_000 },
	];
	for (const unit of units) {
		if (value >= unit.value) {
			const val = (value / unit.value).toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
			return `$${val}${unit.label}`;
		}
	}
	return value.toLocaleString('pt-BR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}
