import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth-service';

const formSchema = z.object({
	email: z.email('E-mail inválido'),
	password: z.string().min(1, 'Senha é obrigatória'),
});

type FormSchema = z.infer<typeof formSchema>;

export function useSignInController() {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { signIn } = useAuth();

	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: authService.signIn,
	});

	const onSubmit = async (data: FormSchema) => {
		const { token } = await mutateAsync({
			email: data.email,
			password: data.password,
		});
		signIn(token);
	};

	return {
		form,
		onSubmit,
		isPending,
		error,
	};
}
