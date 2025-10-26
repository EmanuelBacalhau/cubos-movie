import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { authService } from '@/services/auth-service';

const formSchema = z
	.object({
		name: z.string().min(1, 'Nome é obrigatório'),
		email: z.email('E-mail inválido'),
		password: z.string().min(1, 'Senha é obrigatória'),
		confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	});

type FormSchema = z.infer<typeof formSchema>;

export function useSignUpController() {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const router = useRouter();

	const { mutateAsync, isPending, error } = useMutation({
		mutationFn: authService.signUp,
	});

	const onSubmit = async (data: FormSchema) => {
		await mutateAsync(data);
		router.push('/sign-in');
	};

	return {
		form,
		onSubmit,
		isPending,
		error,
	};
}
