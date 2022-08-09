<script>
	import viewport from "../ts/use-viewport"
	import { manuscript } from "../ts/stores"
	import { contentScrollPosition } from "../ts/stores"
	import { onMount } from "svelte"

	let editor = null
	let innerHeight = window.innerHeight

	onMount(() => {
		const config = {
			lineNumbers: true,
			theme: "idea",
			mode: "xml",
			lineWrapping: true,
		}
		//@ts-ignore
		editor = CodeMirror(document.getElementById("code-editor"), config)
		editor.on("changes", () => {
			//$manuscript.content.update((value) => editor.getValue())
			$manuscript.content = editor.getValue()
		})
		editor.on("scroll", (v) => {
			// console.log("scrolling", editor.getScrollInfo())
			const scrollInfo = editor.getScrollInfo()
			const percent = scrollInfo.top / scrollInfo.height
			// console.log(percent)
			contentScrollPosition.update((v) => percent)
		})
	})

	$: {
		if (editor) {
			if (editor.getValue() != $manuscript.content) {
				editor.setValue($manuscript.content)
			}
			editor.setSize(null, innerHeight - 120)
		}
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.css"
		integrity="sha512-uf06llspW44/LZpHzHT6qBOIVODjWtv4MxCricRxkzvopAlSWnTf6hpZTFxuuZcuNE9CBQhqE0Seu1CoRk84nQ=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/theme/idea.min.css"
		integrity="sha512-N+NJU9LvDmlEQyb3xDkcXPOR8SDXQGx4kRs9wCi/U6GPfN/FSsfjIzY61Svd8eg4Y1VcbBL1XhuC3VzzQYmcJg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

<svelte:window bind:innerHeight />

<div use:viewport on:enterViewport={() => editor.refresh()} id="code-editor" />

<style>
	#code-editor {
		width: 100%;
		max-width: 100%;
		background-color: pink;
		border: 1px solid #eee;
	}
	:global(.CodeMirror) {
		border: 1px solid #eee;
		width: 100%;
		max-width: 100%;
	}
</style>
