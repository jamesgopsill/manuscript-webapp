import { writable } from "svelte/store"
import type { ManuScript } from "./interfaces"

export default writable<ManuScript>({
	title: "Default Title",
	authors: [],
	publication: "",
	keywords: [],
	abstract: "",
	content: "",
	media: {},
	references: {},
})
