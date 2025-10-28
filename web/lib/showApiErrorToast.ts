import { toast } from 'sonner';

export function showApiErrorToast(error: any) {
	const apiError = error?.response?.data?.error || error?.error || error;

  if (apiError?.code === 'VALIDATION' && Array.isArray(apiError?.message)) {
    const errors = apiError.message.map((e: { message: any; }) => e.message).join('; ');

    toast.error(`${apiError.code}: ${errors}`);
    return
  }

	const code = apiError?.code || 'Erro';
	let message =
		apiError?.message || apiError?.toString() || 'Erro desconhecido';

	toast.error(`${code}: ${message}`);
}
