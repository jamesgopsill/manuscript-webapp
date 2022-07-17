<script lang="ts">
	import {
		Navbar,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink,
		Row,
		Col,
		TabContent,
		TabPane,
	} from "sveltestrap"
	import Summary from "./components/Summary.svelte"
	import Preview from "./components/Preview.svelte"
	import Content from "./components/Content.svelte"
	import References from "./components/References.svelte"
	import Media from "./components/Media.svelte"
	// import manuscript from "./ts/manuscript-store"
	import { title, publication, authors, keywords, abstract, content, media, references } from "./ts/stores"

	let fileHandle: any


	const onOpen = async () => {
		console.log("Open Clicked")
		//@ts-ignore
		if (window.showSaveFilePicker) {
			const config = {
				types: [
					{
						description: "ManuScript JSON",
						accept: {
							"text/plain": [".json"],
						},
					},
				],
				excludeAcceptAllOption: true,
				multiple: false,
			}
			// @ts-ignore
			fileHandle = await window.showOpenFilePicker(config)
			fileHandle = fileHandle[0]
			const file = await fileHandle.getFile()
			const text = await file.text()
			const manuscript = JSON.parse(text)
			title.set(manuscript.title)
			publication.set(manuscript.publication)
			authors.set(manuscript.authors)
			keywords.set(manuscript.keywords)
			abstract.set(manuscript.abstract)
			content.set(manuscript.content)
			media.set(manuscript.media)
			references.set(manuscript.references)
			// $manuscript = manuscript
			
		} else {
			console.log("Unsupported browser")
		}
	}

	const onSave = async () => {
		console.log("Save Clicked")
		if (fileHandle) {
			const writable = await fileHandle.createWritable()
			const json = {
				title: $title,
				publication: $publication,
				authors: $authors,
				keywords: $keywords,
				abstract: $abstract,
				content: $content,
				media: $media,
				references: $references
			}
			await writable.write(JSON.stringify(json))
			// await writable.write(JSON.stringify($manuscript))
			await writable.close()
		} else {
			saveNewFile()
		}
	}

	const saveNewFile = async () => {
		// Create a new file
		//@ts-ignore
		if (window.showSaveFilePicker) {
			const config = {
				types: [
					{
						description: "ManuScript JSON",
						accept: {
							"text/plain": [".json"],
						},
					},
				],
			}
			//@ts-ignore
			fileHandle = await window.showSaveFilePicker(config)
			if (fileHandle) {
				const writable = await fileHandle.createWritable()
				const json = {
					title: $title,
					publication: $publication,
					authors: $authors,
					keywords: $keywords,
					abstract: $abstract,
					content: $content,
					media: $media,
					references: $references
				}
				await writable.write(JSON.stringify(json))
				// await writable.write(JSON.stringify($manuscript))
				await writable.close()
			}
		} else {
			console.log("Unsupported browser")
		}
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
	/>
</svelte:head>

<Navbar color="light" light={true} expand="md" class="mb-1">
	<NavbarBrand href="#">ManuScript</NavbarBrand>
	<span class="navbar-text">
		{#if fileHandle}
			{fileHandle.name}
		{:else}
			No File Selected
		{/if}
		(Works on Chrome and Edge)
	</span>
	<Nav class="ms-auto" navbar={true}>
		<NavItem>
			<NavLink href="#">Sponsor</NavLink>
		</NavItem>
		<NavItem>
			<NavLink href="#" on:click={onOpen}>Open</NavLink>
		</NavItem>
		<NavItem>
			<NavLink href="#" on:click={onSave}>Save</NavLink>
		</NavItem>
	</Nav>
</Navbar>

<Row class="my-row">
	<Col>
		<TabContent>
			<TabPane class="mt-1" tabId="summary" tab="Summary" active>
				<Summary />
			</TabPane>
			<TabPane class="mt-1" tabId="content" tab="Content">
				<Content />
			</TabPane>
			<TabPane class="mt-1" tabId="media" tab="Media">
				<Media />
			</TabPane>
			<TabPane class="mt-1" tabId="references" tab="References">
				<References />
			</TabPane>
		</TabContent>
	</Col>
	<Col>
		<Preview />
	</Col>
</Row>

<style>
	:global(.my-row) {
		max-width: 100%;
		margin: 0px;
		padding: 0px;
		padding-left: 10px;
	}
</style>
