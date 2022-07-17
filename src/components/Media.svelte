<script lang="ts">
	import { FormGroup, Row, Col, Table, Button, Input } from "sveltestrap"
	//import manuscript from "../ts/manuscript-store"
	import { media } from "../ts/stores"

	let key: string = ""
	let files: any
	let input: any

	const addMedia = async () => {
		//console.log(key, files, input)
		//console.log(files)

		if (key && files[0]) {
			// get the file in base 64 format
			const reader = new FileReader()
			reader.addEventListener("load", () => {
				//$manuscript.media[key] = reader.result.toString()
				media.update(dict => {
					dict[key] = reader.result.toString()
					return dict
				})
				// reset the values
				key = ""
				input.value = ""
				files = null
			})
			reader.readAsDataURL(files[0])
		} else {
			// reset the values
			key = ""
			input.value = ""
			files = null
		}
	}

	const removeMedia = (k: string) => {
		delete $media[k]
		$media = $media
	}
</script>

<FormGroup>
	<Row>
		<Col class="col-5">
			<Input type="text" placeholder="Media Key" bind:value={key} />
		</Col>
		<Col class="col-5">
			<input class="form-control" type="file" bind:files bind:this={input} />
		</Col>
		<Col class="col-1">
			<Button on:click={addMedia}>Add</Button>
		</Col>
	</Row>
</FormGroup>

<Table bordered striped size="sm">
	<thead>
		<tr>
			<th>Key</th>
			<th>Preview</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries($media) as [k, v]}
			<tr>
				<td>{k}</td>
				<td>
					{#if v.includes("image/jpeg") || v.includes("image/png")}
						<img alt="" src={v} width="150" />
					{:else if v.includes("video/mp4")}
						<video width="150" controls>
							<source src={v} type="video/mp4">
						</video>
					{:else}
						<a href={v} download="dataset">Download</a>
					{/if}

				</td>
				<td>
					<Button on:click={() => removeMedia(k)} size="sm">Remove</Button>
				</td>
			</tr>
		{/each}
	</tbody>
</Table>
