'use client';

import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
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
import { useSignInController } from './hooks/useSignInController';

export const CardFormSignIn = () => {
	const { form, onSubmit, isPending } = useSignInController();

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
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input type="password" placeholder="********" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<CardFooter className="gap-8 justify-between px-0">
							<Link
								href="/sign-up"
								className="text-sm hover:underline text-primary"
							>
								Criar uma conta
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
