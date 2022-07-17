import type { ManuScript } from "./interfaces"

export const removeTags = (tag: string, s: string): string => {
	s = s.replace(`<${tag}>`, "")
	s = s.replace(`</${tag}>`, "")
	s = s.trim()
	return s
}

export const replaceWithHTMLEntities = (s: string): string => {
	s = s.replaceAll("&", "&amp;")
	s = s.replaceAll("''", "&rdquo;")
	s = s.replaceAll("``", "&ldquo;")
	s = s.replaceAll("'", "&rsquo;")
	s = s.replaceAll("`", "&lsquo;")
	return s
}

export const processTitle = (title: ManuScript["title"]): string => {
	let html = title.trim()
	html = replaceWithHTMLEntities(html)
	return html
}

export const processPublication = (
	publication: ManuScript["publication"]
): string => {
	let html = publication.trim()
	html = replaceWithHTMLEntities(html)
	return html
}

export const processAuthors = (authors: ManuScript["authors"]): string => {
	let html = ""
	for (const author of authors) {
		if (author.orcid) {
			html += `<li>${author.name} [<a href="https://orcid.org/${author.orcid}">${author.orcid}</a>]</li>`
		} else {
			html += `<li>${author.name}</li>`
		}
	}
	return html
}

export const processReferences = (
	references: ManuScript["references"]
): string => {
	let html = ""
	for (const [_, v] of Object.entries(references)) {
		if (v.length < 50) {
			html += `<li><a href="${v}">${v}</a></li>`
		} else {
			html += `<li><a href="${v}">${v.substring(0, 50) + "..."}</a></li>`
		}
	}
	return html
}

export const processKeywords = (keywords: ManuScript["keywords"]): string => {
	let html = ""
	for (const k of keywords) {
		html += `<li>${k}</li>`
	}
	return html
}

export const processAbstract = (abstract: ManuScript["abstract"]): string => {
	let html = ""
	let lines = abstract.split("\n")
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i].trim()
		// if line is not empty and the line starts with a alphanumeric character
		if (line && /^[a-z0-9]+$/i.test(line[0])) {
			html += `<p>${line}</p>`
		}
	}
	html = replaceWithHTMLEntities(html)
	return html
}

export const processContent = (
	content: string,
	media: any,
	references: any
): string => {
	//let content = content
	content = processHeadings(content)
	content = processCitations(content, references)
	content = processFigures(content, media)
	content = processTables(content, media)
	content = processSlideshows(content, media)
	content = processVideos(content, media)
	content = processDatasets(content, media)
	content = processEquations(content)
	content = processCode(content)

	// sorting out the paragraphs
	content = content.replaceAll("\r", "")
	let lines = content.split("\n")
	for (var i = 0; i < lines.length; i++) {
		let line = lines[i]
		if (line && /^[a-z0-9]+$/i.test(line[0])) {
			// if line is not empty and the line starts with a alphanumeric character,
			line = replaceWithHTMLEntities(line)
			content = content.replace(lines[i], `<p>${line}</p>`)
		}
	}

	return content
}

const processHeadings = (s: string): string => {
	let headings = s.match(
		/(<Section>|<SubSection>|<SubSubSection>)([\s\S]*?)(<\/Section>|<\/SubSection>|<\/SubSubSection>)/gm
	)
	let h1Increment = 0
	let h2Increment = 0
	let h3Increment = 0
	if (!headings) {
		return s
	}
	for (let i = 0; i < headings.length; i++) {
		let heading = headings[i]
		let newHeading = ""
		if (heading.indexOf("<Section>") === 0) {
			h1Increment++
			h2Increment = 0
			h3Increment = 0
			newHeading += "<h1>"
			newHeading += h1Increment + ". "
			newHeading += removeTags("Section", heading)
			newHeading += "</h1>"
		}
		if (heading.indexOf("<SubSection>") === 0) {
			h2Increment++
			h3Increment = 0
			newHeading += "<h2>"
			newHeading += h1Increment + "." + h2Increment + ". "
			newHeading += removeTags("SubSection", heading)
			newHeading += "</h2>"
		}
		if (heading.indexOf("<SubSubSection>") === 0) {
			h3Increment++
			newHeading += "<h3>"
			newHeading += h1Increment + "." + h2Increment + "." + h3Increment + ". "
			newHeading += removeTags("SubSubSection", heading)
			newHeading += "</h3>"
		}
		newHeading = replaceWithHTMLEntities(newHeading)
		s = s.replace(heading, newHeading)
	}
	return s
}

export const processCitations = (
	c: string,
	references: ManuScript["references"]
): string => {
	let n = 0
	for (const [k, v] of Object.entries(references)) {
		// console.log(k)
		n++
		c = c.replaceAll(k, `<a href="${v}">${n}</a>`)
	}
	c = c.replaceAll("<Cite>", "[")
	c = c.replaceAll("</Cite>", "]")
	return c
}

export const processFigures = (
	s: string,
	fileData: { [key: string]: string }
): string => {
	let figures = s.match(/(<Figure>)([\s\S]*?)(<\/Figure>)/gm)

	if (!figures) {
		return s
	}

	let n = 0
	for (let figXML of figures) {
		n++
		let figReplacementXML = "<Figure>"

		let figMatches = figXML.match(/<Key>([\s\S]*?)<\/Key>/m)
		if (figMatches) {
			let figFile = figMatches[1]
			figFile = figFile.trim()
			if (fileData[figFile]) {
				figReplacementXML += `<img class="paper-img" src="${fileData[figFile]}" />`
			} else {
				figReplacementXML += "NO IMAGE FOUND"
			}
		}

		let captionMatches = figXML.match(/<Caption>([\s\S]*?)<\/Caption>/m)
		let caption = ""
		if (captionMatches != null) {
			caption = captionMatches[1]
			caption = caption.trim()
		} else {
			caption = "No Caption Detected"
		}
		figReplacementXML += `<figcaption><strong>Figure ${n}.</strong> ${caption}</figcaption>`
		figReplacementXML += "</figure>"

		s = s.replace(figXML, figReplacementXML)

		let labelMatch = figXML.match(/<Label>([\s\S]*?)<\/Label>/m)
		if (labelMatch) {
			let label = labelMatch[1]
			label = label.trim()
			if (label) {
				s = s.replaceAll(label, n.toString())
			}
		}
	}
	return s
}

export const processTables = (
	s: string,
	fileData: { [key: string]: string }
): string => {
	const tables = s.match(/(<Table>)([\s\S]*?)(<\/Table>)/gm)

	if (!tables) {
		return s
	}

	let n = 0
	for (const table of tables) {
		n++
		let tableHTML = "<figure>"

		let captionMatches = table.match(/<Caption>([\s\S]*?)<\/Caption>/m)
		let caption = ""
		if (captionMatches != null) {
			caption = captionMatches[1]
			caption = caption.trim()
			tableHTML += `<figcaption><strong>Table ${n}:</strong> ${caption}</figcaption>`
		} else {
			tableHTML += `<p class="paper-alert"><b>Warning:</b>No Caption Detected</p>`
		}

		const keys = table.match(/<Key>([\s\S]*?)<\/Key>/m)
		if (keys) {
			let k = keys[1]
			k = k.trim()
			if (fileData[k]) {
				tableHTML += `<img class="paper-img" src="${fileData[k]}" />`
			} else {
				tableHTML += `<p class="paper-alert"><b>Warning:</b> No image of table could be found.</p>`
			}
		} else {
			tableHTML += `<p class="paper-alert"><b>Warning:</b> <Key> element could not be found</p>`
		}

		tableHTML += `</figure>`

		s = s.replace(table, tableHTML)

		let labelMatch = table.match(/<Label>([\s\S]*?)<\/Label>/m)
		if (labelMatch) {
			let label = labelMatch[1]
			label = label.trim()
			if (label) {
				s = s.replaceAll(label, n.toString())
			}
		}
	}
	return s
}

export const processSlideshows = (
	s: string,
	files: { [key: string]: string }
) => {
	const slideshows = s.match(/(<Slideshow>)([\s\S]*?)(<\/Slideshow>)/gm)

	if (!slideshows) {
		return s
	}

	let n = 0
	for (const slideshow of slideshows) {
		n++
		let replacementHTML = `
			<section class="splide">
			<div class="splide__track">
			<ul class="splide__list">`

		// Get images in slideshow
		const slides = s.match(/(<Slide>)([\s\S]*?)(<\/Slide>)/gm)
		const abc = "abcdefghijklmnopqrstuvwxyz"
		let m = -1
		for (const slide of slides) {
			m++
			replacementHTML += '<li class="splide__slide">'

			let key = slide.match(/<Key>([\s\S]*?)<\/Key>/m)
			if (key) {
				let k = key[1]
				k = k.trim()
				if (files[k]) {
					replacementHTML += `<img src="${files[k]}" />`
				}
			}

			let caption = slide.match(/<Caption>([\s\S]*?)<\/Caption>/m)
			if (caption) {
				let c = caption[1]
				c = c.trim()
				if (c) {
					replacementHTML += `<div class="paper-media-caption">(${abc[m]}) ${c}</div>`
				}
			}

			replacementHTML += "</li>"
		}

		// Slideshow caption
		let captionMatches = slideshow.match(/<Caption>([\s\S]*?)<\/Caption>/gm)
		let caption = ""
		console.log(captionMatches)
		if (captionMatches != null) {
			caption = captionMatches[captionMatches.length - 1]
			caption = caption.trim()
		} else {
			caption = "No Caption Detected"
		}
		replacementHTML += `
			</ul>
			</div>
			</section>
			<p class="paper-media-caption"><strong>Slideshow ${n}.</strong> ${caption}</p>
			`
		s = s.replace(slideshow, replacementHTML)

		let labelMatch = slideshow.match(/<Label>([\s\S]*?)<\/Label>/m)
		if (labelMatch) {
			let label = labelMatch[1]
			label = label.trim()
			if (label) {
				s = s.replaceAll(label, n.toString())
			}
		}
	}

	return s
}

export const processVideos = (s: string, files: { [key: string]: string }) => {
	const videos = s.match(/(<Video>)([\s\S]*?)(<\/Video>)/gm)

	if (!videos) {
		return s
	}

	let n = 0
	for (const video of videos) {
		n++
		let videoHTML = "<div>"

		let key = video.match(/<Key>([\s\S]*?)<\/Key>/m)
		if (key) {
			let k = key[1]
			k = k.trim()
			if (files[k]) {
				videoHTML += `
					<video controls>
						<source src=${files[k]} type="video/mp4">
					</video>`
			}
		}

		let captionMatches = video.match(/<Caption>([\s\S]*?)<\/Caption>/m)
		let caption = ""
		if (captionMatches != null) {
			caption = captionMatches[1]
			caption = caption.trim()
		} else {
			caption = "No Caption Detected"
		}
		videoHTML += `<p class="paper-media-caption"><strong>Video ${n}.</strong> ${caption}</p></div>`
		s = s.replace(video, videoHTML)

		let labelMatch = video.match(/<Label>([\s\S]*?)<\/Label>/m)
		if (labelMatch) {
			let label = labelMatch[1]
			label = label.trim()
			if (label) {
				s = s.replaceAll(label, n.toString())
			}
		}
	}
	return s
}

export const processDatasets = (
	s: string,
	files: { [key: string]: string }
) => {
	const datasets = s.match(/(<Dataset>)([\s\S]*?)(<\/Dataset>)/gm)

	if (!datasets) {
		return s
	}

	let n = 0
	for (const dataset of datasets) {
		n++
		let datasetHTML = ""

		let key = dataset.match(/<Key>([\s\S]*?)<\/Key>/m)
		if (key) {
			let k = key[1]
			k = k.trim()
			if (files[k]) {
				datasetHTML += `<p class="paper-data"><a href="${files[k]}"  download="dataset" >Download Data File</a></p>`
			} else {
				datasetHTML += `<p class="paper-alert"><b>Warning:</b> Data file could not be found</p>`
			}
		} else {
			datasetHTML += `<p class="paper-alert"><b>Warning:</b> <Key> element could not be found</p>`
		}

		let captionMatches = dataset.match(/<Caption>([\s\S]*?)<\/Caption>/m)
		let caption = ""
		if (captionMatches != null) {
			caption = captionMatches[1]
			caption = caption.trim()
		} else {
			caption = `<p class="paper-alert"><b>Warning:</b>No Caption Detected</p>`
		}
		datasetHTML += `<p class="paper-media-caption"><strong>Video ${n}.</strong> ${caption}</p></div>`
		s = s.replace(dataset, datasetHTML)

		let labelMatch = dataset.match(/<Label>([\s\S]*?)<\/Label>/m)
		if (labelMatch) {
			let label = labelMatch[1]
			label = label.trim()
			if (label) {
				s = s.replaceAll(label, n.toString())
			}
		}
	}
	return s
}

export const processEquations = (s: string): string => {
	let tokens = s.match(/<Equation>([\s\S]*?)<\/Equation>/g)

	if (tokens != null) {
		for (let i = 0; i < tokens.length; i++) {
			let maths = removeTags("Equation", tokens[i])
			let label = maths.match(/<Label>([\s\S]*?)<\/Label>/m)
			if (label != null) {
				maths = maths.replace(label[0], "")
			}
			s = s.replace(
				tokens[i],
				`<table class="paper-display-equation">
				<tbody class="paper-display-equation">
				<tr>
				<td class="paper-equation">$$${maths}$$</td>
				<td  class="paper-equation-label">(${i + 1})</td>
				</tr>
				</tbody>
				</table>`
			)
			if (label != null && label[1]) {
				s = s.replaceAll(label[1], (i + 1).toString())
			}
		}
	}
	return s
}

export const processCode = (s: string): string => {
	let tokens = s.match(/<Code>([\s\S]*?)<\/Code>/g)

	if (tokens != null) {
		for (let i = 0; i < tokens.length; i++) {
			let code = removeTags("Code", tokens[i])
			s = s.replace(tokens[i], `<pre>${code}</pre>`)
		}
	}
	return s
}
