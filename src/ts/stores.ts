import { writable } from "svelte/store"
import type { ManuScript } from "./interfaces"

/*
export const title = writable("")
export const publication = writable("")
export const doi = writable("")
export const date = writable("")
export const authors = writable([])
export const keywords = writable([])
export const abstract = writable("")
export const content = writable("")
export const media = writable({})
export const references = writable({})
*/

export const manuscript = writable<ManuScript>({
	title: "Default Title",
	authors: [],
	publication: "",
	keywords: [],
	abstract: "",
	content: "",
	media: {},
	references: {},
	date: "",
	doi: "",
})

export const contentScrollPosition = writable(0)
