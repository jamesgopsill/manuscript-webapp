<script lang="ts">
	import { Button } from "sveltestrap"
	// import manuscript from "../ts/manuscript-store"
	import {
		title,
		publication,
		authors,
		keywords,
		abstract,
		content,
		media,
		references,
		contentScrollPosition,
		doi,
		date,
	} from "../ts/stores"
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
	let refresh

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

	const compile = async () => {
		console.log("hello")
		html = (" " + template).slice(1)
		html = html.replaceAll("{{title}}", processTitle($title))
		html = html.replaceAll("{{authors}}", processAuthors($authors))
		html = html.replace("{{publication}}", processPublication($publication))
		html = html.replace("{{date}}", $date)
		html = html.replaceAll("{{doi}}", $doi)
		html = html.replace("{{keywords}}", processKeywords($keywords))
		html = html.replace("{{abstract}}", processAbstract($abstract))
		html = html.replace(
			"{{content}}",
			processContent($content, $media, $references)
		)
		html = html.replace("{{citations}}", processReferences($references))
		/*
		setTimeout(() => {
			scrollInView()
		}, 100)
		*/
	}

	const setCompileTimer = () => {
		if (refresh == undefined) {
			refresh = setTimeout(() => {
				console.log("Timeout")
				compile()
				refresh = undefined
			}, 2000)
		} else {
			clearTimeout(refresh)
			refresh = setTimeout(() => {
				console.log("Timeout")
				compile()
				refresh = undefined
			}, 2000)
		}
	}

	const scrollInView = () => {
		const iframe = document.getElementById("iframe")
		if (iframe && iframe.contentWindow.document.body.offsetHeight) {
			//@ts-ignore
			const pos =
				$contentScrollPosition * iframe.contentWindow.document.body.offsetHeight
			//@ts-ignore
			iframe.contentWindow.scrollTo(0, pos)
		}
	}

	$: {
		$title
		$abstract
		$authors
		$publication
		$content
		$media
		$references
		$keywords
		$date
		$doi
		setCompileTimer()
	}

	$: {
		$contentScrollPosition
		scrollInView()
	}
</script>

<div class="text-center mb-2">
	<Button size="sm" on:click={downloadHTML}>Download</Button>
</div>

<iframe
	id="iframe"
	class="preview"
	title="preview"
	srcdoc={html}
	on:load={scrollInView}
/>

<style>
	.preview {
		width: 100%;
		height: calc(100vh - 140px);
		/* background-color: pink; */
	}
</style>
