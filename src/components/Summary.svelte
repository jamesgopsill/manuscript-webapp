<script lang="ts">
	import { FormGroup, Input, Label } from "sveltestrap"
	import { title, publication } from "../ts/stores"
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

<Authors />

<Abstract />

<Keywords />
