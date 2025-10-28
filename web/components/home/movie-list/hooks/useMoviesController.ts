import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { privateService } from '@/services/private-service';
import { FindMoviesParams } from '@/services/private-service/find-movies';

export const useMoviesController = () => {
	const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState<FindMoviesParams>({});

	const { data, isLoading, error, } = useQuery({
		queryKey: ['movies', page, filters],
		queryFn: () => privateService.findMovies({ page, ...filters }),
		retry: 1,
	});

	const totalPages = data?.totalPages || 1;

	return {
		isSheetOpen,
		setIsSheetOpen,
		page,
		setPage,
		data,
		isLoading,
		error,
		totalPages,
		setFilters,
	};
};
