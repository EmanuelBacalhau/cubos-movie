type CircleVotesProps = {
	votes: number;
	size?: number;
};

export const CircleVotes = ({ votes, size = 128 }: CircleVotesProps) => {
	const radius = size / 2 - 5;
	const center = size / 2;
	const circumference = 2 * Math.PI * radius;

	return (
		<div className="flex items-center justify-center">
			<div
				className="relative flex items-center justify-center bg-black rounded-full"
				style={{ width: size, height: size }}
			>
				<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
					<title>{votes ? `${votes} votos` : 'Sem votos'}</title>
					<circle
						className="text-gray-700"
						stroke="currentColor"
						strokeWidth="6"
						fill="transparent"
						r={radius}
						cx={center}
						cy={center}
					/>
					<circle
						className="text-yellow-400"
						stroke="currentColor"
						strokeWidth="6"
						fill="transparent"
						r={radius}
						cx={center}
						cy={center}
						strokeDasharray={circumference}
						strokeDashoffset={
							circumference * (1 - (votes ? Math.min(votes, 10) / 10 : 0))
						}
						strokeLinecap="round"
						style={{ transition: 'stroke-dashoffset 0.5s' }}
					/>
				</svg>

				<div
					className="absolute text-white font-bold select-none flex flex-col items-center justify-center "
					style={{ fontSize: size * 0.18 }}
				>
					{votes ? (
						<>
							<span>{votes}</span>
							<span style={{ fontSize: size * 0.12 }}>votos</span>
						</>
					) : (
						'--'
					)}
				</div>
			</div>
		</div>
	);
};
