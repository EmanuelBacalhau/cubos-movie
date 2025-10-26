import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Movie } from '@/services/types/movie';
import { formatCurrencyToShort } from '@/utils/format-currency-to-short';
import { formatHours } from '@/utils/format-hours';
import { CircleVotes } from '../user-list/circle-votes';
import { CardDetails } from './card-detail';

type LayoutMobileProps = {
	data: Movie;
};

export const LayoutMobile = ({ data }: LayoutMobileProps) => {
	return (
		<div className="w-full flex flex-col gap-2">
			<div className="flex flex-col gap-4 items-center w-full">
				<Image src={data.banner} alt={data.title} width={382} height={582} />

				<div className="flex flex-col justify-between items-center gap-2 w-full">
					<div className="flex gap-2 w-full md:w-auto">
						<Button className="rounded-md" variant="outline">
							Deletar
						</Button>

						<Button className="rounded-md flex-1">Editar</Button>
					</div>

					<div className="flex flex-col items-center">
						<h1 className="text-2xl font-bold">{data.title}</h1>
						<span className="text-sm text-muted-foreground">
							{data.originalTitle}
						</span>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-4 gap-4 w-full">
				<div className="col-span-2">
					<CardDetails title="Classificação Indicativa" value={data.rating} />
				</div>
				<CardDetails title="Votos" value={data.votes} />
				<CircleVotes votes={data.votes} size={64} />
			</div>

			<CardDetails title="Sinopse" value={data.description} />

			<div className="flex flex-col gap-1 bg-muted p-2 rounded-md w-full">
				<span className="text-xs text-gray-400 uppercase">Gêneros</span>
				{data.genres.map(genre => (
					<Badge key={genre.id} className="text-lg rounded-md">
						{genre.name}
					</Badge>
				))}
			</div>

			<div className="grid grid-cols-2 gap-2">
				<CardDetails
					title="Lançamento"
					value={
						data.releaseDate
							? new Date(data.releaseDate).toLocaleDateString('en-US', {
									month: '2-digit',
									day: '2-digit',
									year: 'numeric',
								})
							: ''
					}
				/>
				<CardDetails title="Duração" value={formatHours(data.duration)} />
			</div>

			<div className="grid grid-cols-2 gap-2">
				<CardDetails
					title="Situação"
					value={
						data.releaseDate
							? new Date(data.releaseDate) <= new Date()
								? 'Lançado'
								: 'Em produção'
							: ''
					}
				/>
				<CardDetails title="Idioma" value={data.language} />
			</div>

			<div className="grid grid-cols-3 gap-2">
				<CardDetails
					title="Orçamento"
					value={formatCurrencyToShort(data.budget)}
				/>
				<CardDetails
					title="Receita"
					value={formatCurrencyToShort(data.revenue)}
				/>
				<CardDetails title="Lucro" value={formatCurrencyToShort(data.profit)} />
			</div>

			<div>
				<h2 className="text-3xl font-bold">Trailer</h2>
				{data.trailerUrl ? (
					<div className="aspect-video w-full mt-2">
						<iframe
							width="100%"
							height="100%"
							src={`https://www.youtube.com/embed/${data.trailerUrl.split('v=')[1] || data.trailerUrl}`}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="rounded-md w-full h-full"
						/>
					</div>
				) : (
					<span className="text-muted-foreground">Trailer não disponível.</span>
				)}
			</div>
		</div>
	);
};
