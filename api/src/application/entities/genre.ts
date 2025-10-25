export class Genre {
	id: string;
	name: string;
	createdAt: Date;

	constructor(props: Genre.CreateAttributes, id?: string) {
		this.id = id ?? '';
		this.name = props.name;
		this.createdAt = props.createdAt || new Date();
	}
}

export namespace Genre {
	export type CreateAttributes = {
		name: string;
		createdAt?: Date;
	};

	export type Attributes = {
		id: string;
		name: string;
		createdAt: Date;
	};

	export type CreateInput = {
		name: string;
	};

	export type UpdateInput = {
		name?: string;
	};
}
