import { IEmailGateway } from '@application/contracts/gateways/i-email-gateway';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from '@infra/clients/ses-client';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class SESGateway implements IEmailGateway {
	async sendEmail({
		from,
		to,
		subject,
		template,
	}: IEmailGateway.SendEmailParams) {
		const sendEmailCommand = new SendEmailCommand({
			Source: from,
			Destination: {
				ToAddresses: to,
			},
			Message: {
				Subject: {
					Charset: 'UTF-8',
					Data: subject,
				},

				Body: {
					Html: {
						Charset: 'UTF-8',
						Data: template,
					},
				},
			},
		});

		await sesClient.send(sendEmailCommand);
	}
}
