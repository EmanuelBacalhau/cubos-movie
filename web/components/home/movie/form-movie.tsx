import { Loader2Icon, UploadCloudIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMovieFormController } from './hooks/useMovieFormController';

export type MovieForm = {
	title: string;
	description: string;
	releaseDate: string;
	budget: number;
	duration: number;
	trailerUrl: string;
	genres: string[];
	fileBanner: File | null;
	fileCover: File | null;
	votes: number;
	language: string;
	revenue: number;
	profit: number;
	id?: string;
	bannerUrl?: string;
	coverUrl?: string;
};

export const FormMovie = ({
	movieToEdit,
	setIsSheetOpen,
}: {
	movieToEdit?: MovieForm;
	setIsSheetOpen: (isOpen: boolean) => void;
}) => {
	const {
		form,
		bannerPreview,
		coverPreview,
		handleBannerChange,
		handleCoverChange,
		removeBanner,
		removeCover,
		onSubmit,
		isLoading,
		isSuccess,
	} = useMovieFormController(movieToEdit);

	useEffect(() => {
		if (isSuccess) {
			setIsSheetOpen(false);
		}
	}, [isSuccess, setIsSheetOpen]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(async data => {
					await onSubmit(data);
					setIsSheetOpen(false);
				})}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="fileBanner"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Banner</FormLabel>
							<FormControl>
								<div className="flex flex-col items-center gap-2">
									<div className="relative w-full h-32 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/30">
										{bannerPreview ? (
											<>
												<Image
													src={bannerPreview}
													alt="Banner Preview"
													fill
													className="object-cover rounded-lg w-full"
												/>
												<button
													type="button"
													onClick={() => removeBanner(field.onChange)}
													className="absolute top-1 right-1 bg-black/60 text-white rounded px-2 py-0.5 text-xs z-10"
												>
													Remover
												</button>
											</>
										) : (
											<Button
												type="button"
												variant="ghost"
												className="z-10 w-full h-full"
												onClick={() =>
													document.getElementById('fileBannerInput')?.click()
												}
											>
												<UploadCloudIcon className="size-4" />
												Selecionar imagem
											</Button>
										)}
										<Input
											id="fileBannerInput"
											type="file"
											accept="image/*"
											className="hidden"
											onChange={e => {
												const file = e.target.files?.[0] || null;
												handleBannerChange(file, field.onChange);
											}}
										/>
									</div>
									{field.value?.name && (
										<span className="text-xs text-muted-foreground mt-1">
											{field.value.name}
										</span>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="fileCover"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Capa</FormLabel>
							<FormControl>
								<div className="flex flex-col items-center gap-2">
									<div className="relative w-full h-32 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/30">
										{coverPreview ? (
											<>
												<Image
													src={coverPreview}
													alt="Capa Preview"
													fill
													className="object-cover rounded-lg"
												/>
												<button
													type="button"
													onClick={() => removeCover(field.onChange)}
													className="absolute top-1 right-1 bg-black/60 text-white rounded px-2 py-0.5 text-xs z-10"
												>
													Remover
												</button>
											</>
										) : (
											<Button
												type="button"
												variant="ghost"
												className="z-10 w-full h-full"
												onClick={() =>
													document.getElementById('fileCoverInput')?.click()
												}
											>
												<UploadCloudIcon className="size-4" />
												Selecionar imagem
											</Button>
										)}
										<Input
											id="fileCoverInput"
											type="file"
											accept="image/*"
											className="hidden"
											onChange={e => {
												const file = e.target.files?.[0] || null;
												handleCoverChange(file, field.onChange);
											}}
										/>
									</div>
									{field.value?.name && (
										<span className="text-xs text-muted-foreground mt-1">
											{field.value.name}
										</span>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Título</FormLabel>
							<FormControl>
								<Input placeholder="Título" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição</FormLabel>
							<FormControl>
								<Input placeholder="Descrição" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="releaseDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Data de Lançamento</FormLabel>
								<FormControl>
									<Input type="date" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="language"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Idioma</FormLabel>
								<FormControl>
									<Input placeholder="Idioma" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="budget"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Orçamento</FormLabel>
								<FormControl>
									<Input
										type="number"
										step="1"
										{...field}
										value={field.value ?? ''}
										onChange={e =>
											field.onChange(
												e.target.value === '' ? '' : Number(e.target.value)
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="duration"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Duração (horas)</FormLabel>
								<FormControl>
									<Input
										type="number"
										step="0.1"
										{...field}
										value={field.value ?? ''}
										onChange={e =>
											field.onChange(
												e.target.value === '' ? '' : Number(e.target.value)
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="trailerUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>URL do Trailer</FormLabel>
								<FormControl>
									<Input placeholder="URL do Trailer" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="votes"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Votos</FormLabel>
								<FormControl>
									<Input
										type="number"
										step="1"
										{...field}
										value={field.value ?? ''}
										onChange={e =>
											field.onChange(
												e.target.value === '' ? '' : Number(e.target.value)
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="revenue"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Receita</FormLabel>
								<FormControl>
									<Input
										type="number"
										step="1"
										{...field}
										value={field.value ?? ''}
										onChange={e =>
											field.onChange(
												e.target.value === '' ? '' : Number(e.target.value)
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="profit"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Lucro</FormLabel>
								<FormControl>
									<Input
										type="number"
										step="1"
										{...field}
										value={field.value ?? ''}
										onChange={e =>
											field.onChange(
												e.target.value === '' ? '' : Number(e.target.value)
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? (
						<Loader2Icon className="animate-spin mr-2 size-4" />
					) : (
						'Cadastrar Filme'
					)}
				</Button>
			</form>
		</Form>
	);
};
