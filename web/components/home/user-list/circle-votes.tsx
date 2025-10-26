type CircleVotesProps = {
	votes: number;
};

export const CircleVotes = ({ votes }: CircleVotesProps) => {
	return (
		<div className="flex items-center justify-center">
			<div className="relative w-32 h-32 flex items-center justify-center">
				<svg className="w-full h-full" viewBox="0 0 64 64">
					<title>{votes ? `${votes} votos` : 'Sem votos'}</title>
					<circle
						className="text-gray-700"
						stroke="currentColor"
						strokeWidth="6"
						fill="transparent"
						r="27"
						cx="32"
						cy="32"
					/>
					<circle
						className="text-yellow-400"
						stroke="currentColor"
						strokeWidth="6"
						fill="transparent"
						r="27"
						cx="32"
						cy="32"
						strokeDasharray={2 * Math.PI * 27}
						strokeDashoffset={
							2 * Math.PI * 27 * (1 - (votes ? Math.min(votes, 10) / 10 : 0))
						}
						strokeLinecap="round"
						style={{ transition: 'stroke-dashoffset 0.5s' }}
					/>
				</svg>
				<div className="absolute text-white text-xl font-bold select-none flex flex-col items-center justify-center">
					{votes ? (
						<>
							<span>{votes}</span>
							<span>votos</span>
						</>
					) : (
						'--'
					)}
				</div>
			</div>
		</div>
	);
};
