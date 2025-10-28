import { toast } from 'sonner';

export function showApiErrorToast(error: any) {
	const apiError = error?.response?.data?.error || error?.error || error;
	const code = apiError?.code || 'Erro';
	let message =
		apiError?.message || apiError?.toString() || 'Erro desconhecido';

	if (Array.isArray(message)) {
		message = message.join(' ');
	}

	toast.error(`${code}: ${message}`);
}
