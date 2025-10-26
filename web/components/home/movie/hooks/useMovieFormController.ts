import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { privateService } from '@/services/private-service';
import { CreateMovieForm } from '../form-movie';

export function useMovieFormController(movieToEdit?: CreateMovieForm) {
	const form = useForm<CreateMovieForm>({
		defaultValues: movieToEdit
			? { ...movieToEdit }
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
				},
		mode: 'onSubmit',
	});

	const [bannerPreview, setBannerPreview] = useState<string | null>(
		movieToEdit?.bannerUrl || null
	);
	const [coverPreview, setCoverPreview] = useState<string | null>(
		movieToEdit?.coverUrl || null
	);

	const { mutateAsync, isPending, isSuccess } = useMutation({
		mutationFn: privateService.createMovie,
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
		async (data: CreateMovieForm) => {
			if (!data.fileBanner || !data.fileCover) {
				alert('Por favor, selecione o banner e a capa do filme.');
				return;
			}
			if (data.fileBanner.size === 0 || data.fileCover.size === 0) {
				alert('Arquivo de banner ou capa inválido. Selecione novamente.');
				return;
			}
			const { uploadBannerSignature, uploadCoverSignature } = await mutateAsync(
				{
					...data,
					fileBanner: {
						size: data.fileBanner.size,
						inputType: data.fileBanner.name.split('.').pop() || '',
					},
					fileCover: {
						size: data.fileCover.size,
						inputType: data.fileCover.name.split('.').pop() || '',
					},
				}
			);
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
		},
		[mutateAsync]
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
		isLoading: isPending,
		isSuccess,
	};
}
