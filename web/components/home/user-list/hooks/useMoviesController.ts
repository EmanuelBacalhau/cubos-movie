import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { privateService } from '@/services/private-service';

export const useMoviesController = () => {
	const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

	const [page, setPage] = useState(1);
	const { data, isLoading, error } = useQuery({
		queryKey: ['movies'],
		queryFn: privateService.findMovies,
		refetchInterval: 2000,
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
	};
};
