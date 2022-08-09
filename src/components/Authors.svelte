<script lang="ts">
	import { manuscript } from "../ts/stores"
	import { Col, Row, Button, Table, Input, FormGroup, Label } from "sveltestrap"

	let name = ""
	let orcid = ""

	const addAuthor = () => {
		console.log("Adding Author", name)
		$manuscript.authors.push({
			name: name,
			orcid: orcid,
		})
		$manuscript.authors = $manuscript.authors
		name = ""
		orcid = ""
	}

	const removeAuthor = (idx: number) => {
		console.log(idx)
		$manuscript.authors.splice(idx, 1)
		$manuscript.authors = $manuscript.authors
	}
</script>

<FormGroup>
	<Label>Authors</Label>
	<Row>
		<Col class="col-5">
			<Input type="text" placeholder="Name" bind:value={name} />
		</Col>
		<Col class="col-5">
			<Input type="text" placeholder="ORCID" bind:value={orcid} />
		</Col>
		<Col class="col-1">
			<Button on:click={addAuthor}>Add</Button>
		</Col>
	</Row>
</FormGroup>

<Table bordered striped size="sm">
	<thead>
		<tr>
			<th>Name</th>
			<th>ORCID</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each $manuscript.authors as author, i}
			<tr>
				<td>{author.name}</td>
				<td>{author.orcid}</td>
				<td>
					<Button size="sm" on:click={() => removeAuthor(i)}>Remove</Button>
				</td>
			</tr>
		{/each}
	</tbody>
</Table>
