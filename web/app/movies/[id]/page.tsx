'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { LayoutMobile } from '@/components/home/movie/layout-mobile';
import { privateService } from '@/services/private-service';

const MoviesDetails = () => {
	const paramas = useParams() as { id: string };

	const { data, isLoading } = useQuery({
		queryKey: ['movie-details', paramas.id],
		queryFn: () => privateService.findMovieById({ id: paramas.id }),
	});

	if (isLoading) {
		return null;
	}

	return (
		<div className="p-4">
			<LayoutMobile data={data!} />
		</div>
	);
};

export default MoviesDetails;
