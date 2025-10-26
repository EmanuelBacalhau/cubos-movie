import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CardFormSignUp = () => {
	return (
		<Card className="w-full max-w-sm bg-background">
			<CardContent>
				<form>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Name</Label>
							<Input id="email" type="text" placeholder="John Doe" required />
						</div>

						<div className="grid gap-2">
							<Label htmlFor="email">E-mail</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="email">Senha</Label>
							<Input
								id="password"
								type="password"
								placeholder="********"
								required
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="email">Confirmação de senha</Label>
							<Input
								id="confirm-password"
								type="password"
								placeholder="********"
								required
							/>
						</div>
					</div>
				</form>
			</CardContent>

			<CardFooter className="gap-8 justify-end">
				<Button type="submit" className="flex-1">
					Cadastrar
				</Button>
			</CardFooter>
		</Card>
	);
};
