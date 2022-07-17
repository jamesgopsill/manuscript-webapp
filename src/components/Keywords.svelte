<script lang="ts">
	//import manuscript from "../ts/manuscript-store"
	import { keywords } from "../ts/stores"
	import { Col, Row, Button, Table, Input, FormGroup, Label } from "sveltestrap"

	let keyword = ""

	const addKeyword = () => {
		keywords.update(value => {
			value.push(keyword)
			return value
		})
		//$manuscript.keywords.push(keyword)
		//$manuscript.keywords = $manuscript.keywords
		keyword = ""
	}

	const removeKeyword = (idx: number) => {
		keywords.update(value => {
			value.splice(idx, 1)
			return value
		})
		//$manuscript.keywords.splice(idx, 1)
		//$manuscript.keywords = $manuscript.keywords
	}
</script>

<FormGroup>
	<Label>Keywords</Label>
	<Row>
		<Col class="col-5">
			<Input type="text" placeholder="Name" bind:value={keyword} />
		</Col>
		<Col class="col-1">
			<Button on:click={addKeyword}>Add</Button>
		</Col>
	</Row>
</FormGroup>

<Table bordered striped size="sm">
	<thead>
		<tr>
			<th>Keyword</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each $keywords as keyword, i}
			<tr>
				<td>{keyword}</td>
				<td>
					<Button size="sm" on:click={() => removeKeyword(i)}>Remove</Button>
				</td>
			</tr>
		{/each}
	</tbody>
</Table>
