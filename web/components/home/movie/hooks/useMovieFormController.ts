import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { queryClient } from '@/lib/queryClient';
import { privateService } from '@/services/private-service';
import { MovieEditForm, MovieForm } from '../form-movie';
import { toast } from 'sonner';

export function useMovieFormController(movieToEdit?: MovieEditForm) {
	const { data: genresList } = useQuery({
		queryKey: ['genres-list'],
		queryFn: () => privateService.findGenres(),
	});

	const form = useForm<MovieForm>({
		defaultValues: movieToEdit
			? {
					...movieToEdit,
					genres: movieToEdit.genres.map(genre => genre.id),
					fileBanner: null,
					fileCover: null,
				}
			: {
					title: '',
					description: '',
					releaseDate: '',
					budget: 0,
					duration: 0,
					trailerUrl: '',
					genres: [],
					fileBanner: null,
					fileCover: null,
					votes: 0,
					language: '',
					revenue: 0,
					profit: 0,
					originalTitle: '',
					rating: '',
				},
		mode: 'onSubmit',
	});

	const [bannerPreview, setBannerPreview] = useState<string | null>(
		movieToEdit?.bannerUrl || null
	);
	const [coverPreview, setCoverPreview] = useState<string | null>(
		movieToEdit?.coverUrl || null
	);

	const {
		mutateAsync: mutateCreateAsync,
		isPending: isCreatePending,
		isSuccess: isCreateSuccess,
	} = useMutation({
		mutationFn: privateService.createMovie,
	});

	const {
		mutateAsync: mutateUpdateAsync,
		isPending: isUpdatePending,
		isSuccess: isUpdateSuccess,
	} = useMutation({
		mutationFn: privateService.updateMovie,
	});

	const handleBannerChange = useCallback(
		(file: File | null, onChange: (file: File | null) => void) => {
			onChange(file);
			if (file) {
				const url = URL.createObjectURL(file);
				setBannerPreview(url);
			} else {
				setBannerPreview(null);
			}
		},
		[]
	);

	const handleCoverChange = useCallback(
		(file: File | null, onChange: (file: File | null) => void) => {
			onChange(file);
			if (file) {
				const url = URL.createObjectURL(file);
				setCoverPreview(url);
			} else {
				setCoverPreview(null);
			}
		},
		[]
	);

	const removeBanner = useCallback((onChange: (file: File | null) => void) => {
		onChange(null);
		setBannerPreview(null);
	}, []);

	const removeCover = useCallback((onChange: (file: File | null) => void) => {
		onChange(null);
		setCoverPreview(null);
	}, []);

	const onSubmit = useCallback(
		async (data: MovieForm) => {
			const hasBanner = data.fileBanner || movieToEdit?.bannerUrl;
			const hasCover = data.fileCover || movieToEdit?.coverUrl;
			if (!hasBanner || !hasCover) {
        toast.error('Erro: Banner e capa são obrigatórios.');
				return;
			}
			if (
				(data.fileBanner &&
					(!(data.fileBanner instanceof File) || data.fileBanner.size === 0)) ||
				(data.fileCover &&
					(!(data.fileCover instanceof File) || data.fileCover.size === 0))
			) {
        toast.error('Erro: Arquivo de banner ou capa inválido.');
				return;
			}

			if (data.fileBanner instanceof File && data.fileCover instanceof File) {
				const { uploadBannerSignature, uploadCoverSignature } =
					await mutateCreateAsync({
						...data,
						fileBanner: {
							size: data.fileBanner.size,
							inputType: data.fileBanner.name.split('.').pop() || '',
						},
						fileCover: {
							size: data.fileCover.size,
							inputType: data.fileCover.name.split('.').pop() || '',
						},
					});
				const bannerFormData = new FormData();
				Object.entries(uploadBannerSignature.fields).forEach(([key, value]) => {
					bannerFormData.append(key, value as string);
				});
				bannerFormData.append('file', data.fileBanner);
				await fetch(uploadBannerSignature.url, {
					method: 'POST',
					body: bannerFormData,
				});
				const coverFormData = new FormData();
				Object.entries(uploadCoverSignature.fields).forEach(([key, value]) => {
					coverFormData.append(key, value as string);
				});
				coverFormData.append('file', data.fileCover);
				await fetch(uploadCoverSignature.url, {
					method: 'POST',
					body: coverFormData,
				});

				queryClient.invalidateQueries({
					queryKey: ['movies'],
				});
			} else {
				const { fileBanner, fileCover, ...rest } = data;

				await mutateUpdateAsync(rest);

        queryClient.invalidateQueries({
					queryKey: ['movies'],
				});
			}
		},
		[
			mutateCreateAsync,
			movieToEdit?.bannerUrl,
			movieToEdit?.coverUrl,
			mutateUpdateAsync,
		]
	);

	return {
		form,
		bannerPreview,
		coverPreview,
		handleBannerChange,
		handleCoverChange,
		removeBanner,
		removeCover,
		onSubmit,
		isLoading: isCreatePending || isUpdatePending,
		isSuccess: isCreateSuccess || isUpdateSuccess,
		genresList,
	};
}
