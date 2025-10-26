type CardDetailsProps = {
	title: string;
	value: string | number;
};

export const CardDetails = ({ title, value }: CardDetailsProps) => {
	return (
		<div className="flex flex-col gap-1 bg-muted p-2 rounded-md w-full">
			<span className="text-xs text-gray-400 uppercase">{title}</span>
			<span className="text-lg font-medium">{value}</span>
		</div>
	);
};
