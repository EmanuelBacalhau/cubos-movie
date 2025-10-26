import { toast } from 'sonner';

export function showApiErrorToast(error: any) {
	// Tenta extrair a mensagem do backend
	const apiError = error?.response?.data?.error || error?.error || error;
	const code = apiError?.code || 'Erro';
	let message =
		apiError?.message || apiError?.toString() || 'Erro desconhecido';

	// Se vier array de mensagens (ex: validação), junta tudo
	if (Array.isArray(message)) {
		message = message.join(' ');
	}

	toast.error(`${code}: ${message}`);
}
