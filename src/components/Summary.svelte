<script lang="ts">
	import { FormGroup, Input, Label } from "sveltestrap"
	import manuscript from "../ts/manuscript-store"
	import Authors from "./Authors.svelte"
	import Abstract from "./Abstract.svelte"
	import Keywords from "./Keywords.svelte"
</script>

<FormGroup>
	<Label>Title</Label>
	<Input type="text" bind:value={$manuscript.title} />
</FormGroup>

<FormGroup>
	<Label>Publication</Label>
	<Input type="text" bind:value={$manuscript.publication} />
</FormGroup>

<Authors />

<Abstract />

<Keywords />
