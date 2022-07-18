<script lang="ts">
	import { FormGroup, Input, Label } from "sveltestrap"
	import { title, publication, date, doi } from "../ts/stores"
	import Authors from "./Authors.svelte"
	import Abstract from "./Abstract.svelte"
	import Keywords from "./Keywords.svelte"
</script>

<FormGroup>
	<Label>Title</Label>
	<Input type="text" bind:value={$title} />
</FormGroup>

<FormGroup>
	<Label>Publication</Label>
	<Input type="text" bind:value={$publication} />
</FormGroup>

<FormGroup>
	<Label>Date Published</Label>
	<Input type="text" bind:value={$date} />
</FormGroup>

<FormGroup>
	<Label>DOI</Label>
	<Input type="text" bind:value={$doi} />
</FormGroup>

<Authors />

<Abstract />

<Keywords />
