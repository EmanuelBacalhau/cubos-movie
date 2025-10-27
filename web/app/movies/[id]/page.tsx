'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMovieDetailsController } from '@/components/home/movie/hooks/useMovieDetials';
import { LayoutDesktop } from '@/components/home/movie/layout-desktop';
import { LayoutMobile } from '@/components/home/movie/layout-mobile';
import { privateService } from '@/services/private-service';

const MoviesDetails = () => {
	const router = useRouter();
	const { handleDeleteMovie, isDeleted } = useMovieDetailsController();
	const paramas = useParams() as { id: string };

	const { data, isLoading, isError } = useQuery({
		queryKey: ['movie-details', paramas.id],
		queryFn: () => privateService.findMovieById({ id: paramas.id }),
	});

	useEffect(() => {
		if (isDeleted || isError) {
			router.push('/');
		}
	}, [isDeleted, router, isError]);

	if (isLoading) {
		return null;
	}

	return (
		<div className="p-4">
			<LayoutMobile data={data!} handleDeleteMovie={handleDeleteMovie} />
			<LayoutDesktop data={data!} handleDeleteMovie={handleDeleteMovie} />
		</div>
	);
};

export default MoviesDetails;
