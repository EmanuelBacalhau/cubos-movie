import { useMutation } from '@tanstack/react-query';
import { privateService } from '@/services/private-service';

export function useMovieDetailsController() {
	const { mutateAsync, isSuccess, error } = useMutation({
		mutationFn: (id: string) => privateService.deleteMovie({ id }),
	});

	return {
		handleDeleteMovie: mutateAsync,
		isDeleted: isSuccess,
	};
}
