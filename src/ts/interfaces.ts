export interface ManuScript {
	title: string
	authors: ManuScriptAuthor[]
	abstract: string
	publication: string
	keywords: string[]
	content: string
	media: {
		[key: string]: string
	}
	references: {
		[key: string]: string
	}
	date: string
	doi: string
}

export interface ManuScriptAuthor {
	name: string
	orcid: string
}

export const manuscriptSchema = {
	type: "object",
	properties: {
		title: {
			type: "string",
		},
		abstract: {
			type: "string",
		},
		publication: {
			type: "string",
		},
		content: {
			type: "string",
		},
		date: {
			type: "string",
		},
		doi: {
			type: "string",
		},
		keywords: {
			type: "array",
			items: {
				type: "string",
			},
		},
		authors: {
			type: "array",
			items: {
				type: "object",
				properties: {
					name: {
						type: "string",
					},
					orcid: {
						type: "string",
					},
				},
			},
		},
		media: {
			type: "object",
			additionalProperties: {
				type: "string",
			},
		},
		references: {
			type: "object",
			additionalProperties: {
				type: "string",
			},
		},
	},
	required: [
		"title",
		"abstract",
		"publication",
		"content",
		"date",
		"doi",
		"keywords",
		"authors",
		"media",
		"references",
	],
	additionalProperties: false,
}
