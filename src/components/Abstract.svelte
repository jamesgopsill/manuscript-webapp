<script lang="ts">
	import { manuscript } from "../ts/stores"
	import { Input, FormGroup, Label } from "sveltestrap"

	let inner: HTMLTextAreaElement
	const resize = () => {
		inner.style.height = "auto"
		inner.style.height = 4 + inner.scrollHeight + "px"
	}
</script>

<FormGroup>
	<Label>Abstract</Label>
	<Input
		rows={5}
		type="textarea"
		bind:inner
		on:input={resize}
		bind:value={$manuscript.abstract}
	/>
</FormGroup>
