import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationProps = {
	page: number;
	setPage: (page: number) => void;
	totalPages: number;
};

export const PaginationMovieList = ({
	page,
	setPage,
	totalPages,
}: PaginationProps) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={() => setPage(Math.max(page - 1, 1))}
						aria-disabled={page === 1}
						className={
							page === 1
								? 'opacity-50 pointer-events-none'
								: page > 1
									? 'bg-primary'
									: ''
						}
					/>
				</PaginationItem>

				{pages.map(p => (
					<PaginationItem key={p}>
						<PaginationLink
							href="#"
							isActive={p === page}
							onClick={() => setPage(p)}
							className={p !== page ? 'bg-primary' : ''}
						>
							{p}
						</PaginationLink>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={() => setPage(Math.min(page + 1, totalPages))}
						aria-disabled={page === totalPages}
						className={
							page === totalPages
								? 'opacity-50 pointer-events-none'
								: page < totalPages
									? 'bg-primary'
									: ''
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
