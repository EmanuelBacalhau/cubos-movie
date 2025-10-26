import { QueryClient } from '@tanstack/react-query';
import { showApiErrorToast } from './showApiErrorToast';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

queryClient.getQueryCache().subscribe(event => {
	if (event?.type === 'updated') {
		const query = event.query;
		if (query.state.status === 'error' && query.state.error) {
			showApiErrorToast(query.state.error);
		}
	}
});

queryClient.getMutationCache().subscribe(event => {
	if (event?.type === 'updated') {
		const mutation = event.mutation;
		if (mutation.state.status === 'error' && mutation.state.error) {
			showApiErrorToast(mutation.state.error);
		}
	}
});
