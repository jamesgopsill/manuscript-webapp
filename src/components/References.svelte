<script lang="ts">
	import manuscript from "../ts/manuscript-store"
	import { Col, Row, Button, Table, Input, FormGroup } from "sveltestrap"

	let key = ""
	let url = ""

	const addReference = () => {
		$manuscript.references[key] = url
		key = ""
		url = ""
	}

	const removeReference = (k: string) => {
		delete $manuscript.references[k]
		$manuscript.references = $manuscript.references
	}
</script>

<FormGroup>
	<Row>
		<Col class="col-5">
			<Input type="text" placeholder="Citation Key" bind:value={key} />
		</Col>
		<Col class="col-5">
			<Input type="text" placeholder="URL" bind:value={url} />
		</Col>
		<Col class="col-1">
			<Button on:click={addReference}>Add</Button>
		</Col>
	</Row>
</FormGroup>

<Table bordered striped size="sm">
	<thead>
		<tr>
			<th>Key</th>
			<th>URL</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries($manuscript.references) as [k, v]}
			<tr>
				<td>{k}</td>
				{#if v.length > 50}
					<td><a href={v}>{v.substring(0, 50)+"..."}</a></td>
				{:else}
					<td><a href={v}>{v}</a></td>
				{/if}
				<td>
					<Button size="sm" on:click={() => removeReference(k)}>Remove</Button>
				</td>
			</tr>
		{/each}
	</tbody>
</Table>
