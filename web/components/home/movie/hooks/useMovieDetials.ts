import { useMutation } from '@tanstack/react-query';
import { privateService } from '@/services/private-service';

export function useMovieDetailsController() {
	const { mutateAsync, isSuccess, error } = useMutation({
		mutationFn: (id: string) => privateService.deleteMovie({ id }),
	});

	console.log(error);

	return {
		handleDeleteMovie: mutateAsync,
		isDeleted: isSuccess,
	};
}
