import { Card, CardContent } from '@/components/ui/card';
import { Movie } from '@/services/types/movie';
import { CircleVotes } from './circle-votes';

type CardMovieProps = {
	movie: Movie;
};

export const CardMovie = ({ movie }: CardMovieProps) => {
	return (
		<Card className="w-full max-w-sm p-0 overflow-hidden rounded-sm h-full">
			<CardContent className="relative p-4 bg-[url(https://i.pinimg.com/736x/02/63/e6/0263e63cd3ccdfa0e616222ead816171.jpg)] bg-cover h-full flex flex-col justify-end group max-h-full">
				<div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none group-hover:from-black" />

				<div className="hidden group-hover:flex absolute inset-0 items-center justify-center">
					<CircleVotes votes={movie.votes} />
				</div>

				<div className="z-1 text-white flex flex-col gap-1 min-h-14">
					<strong className="truncate block max-w-full" title={movie.title}>
						{movie.title}
					</strong>

					<span className="hidden group-hover:block truncate max-w-full">
						{movie.genres.map(genre => genre.name).join(', ')}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
