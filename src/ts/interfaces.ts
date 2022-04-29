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
}

export interface ManuScriptAuthor {
	name: string
	orcid: string
}
