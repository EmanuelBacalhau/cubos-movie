export class User {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(props: User.CreateAttributes, id?: string) {
		this.id = id ?? '';
		this.name = props.name;
		this.email = props.email;
		this.password = props.password;
		this.createdAt = props.createdAt || new Date();
		this.updatedAt = props.updatedAt || new Date();
	}
}

export namespace User {
	export type CreateAttributes = {
		name: string;
		email: string;
		password: string;
		createdAt?: Date;
		updatedAt?: Date;
	};

	export type Attributes = {
		id: string;
		name: string;
		email: string;
		password: string;
		createdAt: Date;
		updatedAt: Date;
	};

	export type CreateInput = {
		name: string;
		email: string;
		password: string;
	};

	export type UpdateInput = {
		name?: string;
		email?: string;
		password?: string;
	};
}
