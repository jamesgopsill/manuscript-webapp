<script lang="ts">
	import { Button } from "sveltestrap"
	import manuscript from "../ts/manuscript-store"
	import { template } from "../ts/template"
	import {
		processTitle,
		processReferences,
		processAuthors,
		processPublication,
		processKeywords,
		processAbstract,
		processContent,
	} from "../ts/manuscript-parser-fcns"

	let html = ""

	const downloadHTML = async () => {
		//@ts-ignore
		const newFileHandle = await window.showSaveFilePicker({
			types: [
				{
					description: "ManuScript HTML",
					accept: {
						"text/plain": [".html"],
					},
				},
			],
		})
		if (newFileHandle) {
			const writable = await newFileHandle.createWritable()
			await writable.write(html)
			await writable.close()
		}
	}

	$: {
		html = (" " + template).slice(1)
		//console.log($manuscript.title)
		html = html.replaceAll("{{title}}", processTitle($manuscript.title))
		html = html.replaceAll("{{authors}}", processAuthors($manuscript.authors))
		html = html.replace(
			"{{publication}}",
			processPublication($manuscript.publication)
		)
		html = html.replace("{{keywords}}", processKeywords($manuscript.keywords))
		html = html.replace("{{abstract}}", processAbstract($manuscript.abstract))
		html = html.replace("{{content}}", processContent($manuscript))
		html = html.replace(
			"{{citations}}",
			processReferences($manuscript.references)
		)
	}
</script>

<div class="text-center mb-2">
	<Button size="sm" on:click={downloadHTML}>Download</Button>
</div>
<iframe class="preview" title="preview" srcdoc={html} />

<style>
	.preview {
		width: 100%;
		height: calc(100vh - 140px);
		/* background-color: pink; */
	}
</style>
