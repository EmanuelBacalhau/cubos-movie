'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth-service';

const formSchema = z.object({
	email: z.email('E-mail inválido'),
	password: z.string().min(1, 'Senha é obrigatória'),
});

type FormSchema = z.infer<typeof formSchema>;

export const CardFormSignIn = () => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const navigation = useRouter();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: authService.signIn,
	});

	const { signIn } = useAuth();

	const onSubmit = async (data: FormSchema) => {
		const { token } = await mutateAsync({
			email: data.email,
			password: data.password,
		});

		signIn(token);
		navigation.push('/dashboard');
	};

	return (
		<Card className="w-full max-w-sm bg-background">
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="m@example.com"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input type="password" placeholder="********" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<CardFooter className="gap-8 justify-between px-0">
							<Link href="#" className="text-sm hover:underline text-primary">
								Esqueceu sua senha?
							</Link>

							<Button type="submit" className="flex-1" disabled={isPending}>
								{isPending ? (
									<Loader2Icon className="size-4 animate-spin" />
								) : (
									'Entrar'
								)}
							</Button>
						</CardFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
