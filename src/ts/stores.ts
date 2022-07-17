import { writable } from "svelte/store"

export const title = writable("")
export const publication = writable("")
export const authors = writable([])
export const keywords = writable([])
export const abstract = writable("")
export const content = writable("")
export const media = writable({})
export const references = writable({})
export const contentScrollPosition = writable(0)
