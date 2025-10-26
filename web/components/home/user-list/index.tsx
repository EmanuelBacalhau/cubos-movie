'use client';

import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { privateService } from '@/services/private-service';
import { CardMovie } from './card-movie';
import { PaginationUserList } from './pagination-user-list';

export const UserList = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading, error } = useQuery({
		queryKey: ['movies'],
		queryFn: privateService.findMovies,
	});

	const totalPages = data?.totalPages || 1;

	return (
		<div className="flex flex-col gap-4 flex-1">
			<div className="flex flex-col justify-end gap-2 md:flex-row">
				<div className="flex gap-2 items-center bg-input/30 pl-1 pr-2 border border-input rounded-lg flex-1 md:max-w-sm">
					<Input
						placeholder="Pesquisar..."
						className="dark:bg-transparent bg-transparent border-none flex-1"
					/>
					<SearchIcon className="size-6" />
				</div>
				<div className="flex flex-row gap-2">
					<Button variant="outline" className="flex-1">
						Filtros
					</Button>
					<Button className="flex-1">Adicionar Filme</Button>
				</div>
			</div>

			{isLoading && (
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 flex-1">
					{Array.from({ length: 10 }).map((_, id) => (
						<Skeleton key={id.toString()} className="h-90" />
					))}
				</div>
			)}

			<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 flex-1">
				{data?.items.map(movie => (
					<CardMovie key={movie.id} movie={movie} />
				))}
			</div>

			{isLoading ? (
				<Skeleton className="h-10 w-full" />
			) : (
				<PaginationUserList
					page={page}
					setPage={setPage}
					totalPages={totalPages}
				/>
			)}
		</div>
	);
};
