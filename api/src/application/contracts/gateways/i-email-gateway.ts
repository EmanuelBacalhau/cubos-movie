export interface IEmailGateway {
	sendEmail({
		from,
		to,
		subject,
		template,
	}: IEmailGateway.SendEmailParams): Promise<void>;
}

export namespace IEmailGateway {
	export type SendEmailParams = {
		from: string;
		to: string[];
		subject: string;
		template: string;
	};
}
