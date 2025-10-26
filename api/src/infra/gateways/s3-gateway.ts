import { randomUUID } from 'node:crypto';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '@infra/clients/s3Client';
import { Injectable } from '@kernel/decorators/injectable';
import { minutesSeconds } from '@shared/utils/minutes-seconds';

@Injectable()
export class S3Gateway {
	private readonly bucket = process.env.AWS_S3_BUCKET_NAME as string;

	static generateInputFileKey({
		inputType,
	}: S3Gateway.GenerateInputFileKey): string {
		const filename = `${randomUUID()}.${inputType}`;

		return `${filename}`;
	}

	async createPOST({ file }: S3Gateway.CreatePOSTParams) {
		const { url, fields } = await createPresignedPost(s3Client, {
			Bucket: this.bucket,
			Key: file.key,
			Expires: minutesSeconds(5),
			Conditions: [
				{ bucket: this.bucket },
				['eq', '$key', file.key],
				['eq', '$Content-Type', file.inputType],
				['content-length-range', file.size, file.size],
			],
		});

		const uploadSignature = Buffer.from(
			JSON.stringify({
				url,
				fields: {
					...fields,
					'Content-Type': file.inputType,
				},
			})
		).toString('base64');

		return { uploadSignature };
	}

	async generatePresignedUrl({
		key,
	}: S3Gateway.PresignParams): Promise<string> {
		const command = new GetObjectCommand({
			Bucket: this.bucket,
			Key: key,
		});

		const presigned = getSignedUrl(s3Client, command, {
			signableHeaders: new Set(['content-type']),
			expiresIn: minutesSeconds(5),
		});

		return presigned;
	}
}

export namespace S3Gateway {
	export type GenerateInputFileKey = {
		inputType: string;
	};

	export type CreatePOSTParams = {
		file: {
			key: string;
			size: number;
			inputType: string;
		};
	};

	export type CreatePOSTResult = {
		uploadSignature: string;
	};

	export type PresignParams = {
		key: string;
	};
}
