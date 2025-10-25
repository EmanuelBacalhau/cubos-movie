export interface Pagination<T> {
	items: T[];
	total: number;
	page: number;
	perPage: number;
	totalPages: number;
}
