import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Movie } from '@/services/types/movie';
import { CircleVotes } from './circle-votes';

type CardMovieProps = {
	movie: Movie;
};

export const CardMovie = ({ movie }: CardMovieProps) => {
	return (
		<Card className="w-full max-w-sm p-0 overflow-hidden rounded-sm max-h-[355px] h-[355px] relative">
			<Link
				href={`/movies/${movie.id}`}
				className="w-full max-w-sm p-0 overflow-hidden rounded-sm h-full relative"
			>
				<CardContent className="relative bg-cover h-full flex flex-col justify-end group p-0 max-h-[355px]">
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none group-hover:from-black" />

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

					<div className="z-1 text-white flex flex-col gap-0.5 min-h-10 p-4">
						<strong className="truncate block max-w-full text-md leading-tight">
							{movie.title}
						</strong>

						<span className="hidden group-hover:block truncate max-w-full text-sm leading-tight">
							{movie.genres.map(genre => genre.name).join(', ')}
						</span>
					</div>
				</CardContent>
			</Link>
		</Card>
	);
};
