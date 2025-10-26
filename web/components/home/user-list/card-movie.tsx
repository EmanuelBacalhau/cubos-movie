import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Movie } from '@/services/types/movie';
import { CircleVotes } from './circle-votes';

type CardMovieProps = {
	movie: Movie;
};

export const CardMovie = ({ movie }: CardMovieProps) => {
	return (
		<Card className="w-full max-w-sm p-0 overflow-hidden rounded-sm max-h-[355px]">
			<CardContent
				className={`relative p-4 bg-cover h-full flex flex-col justify-end group max-h-[355px]`}
			>
				<div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none group-hover:from-black" />

				<Image
					src={movie.banner}
					alt={movie.title}
					width={400}
					height={225}
					className="absolute inset-0 w-full h-full object-cover z-0"
				/>

				<div className="hidden group-hover:flex absolute inset-0 items-center justify-center">
					<CircleVotes votes={movie.votes} />
				</div>

				<div className="z-1 text-white flex flex-col gap-0.5 min-h-10">
					<strong
						className="truncate block max-w-full text-md leading-tight"
						title={movie.title}
					>
						{movie.title}
					</strong>

					<span className="hidden group-hover:block truncate max-w-full text-sm leading-tight">
						{movie.genres.map(genre => genre.name).join(', ')}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
