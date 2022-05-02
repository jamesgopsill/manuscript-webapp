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

export const processContent = (manuscript: ManuScript): string => {
	let content = manuscript.content
	content = processHeadings(content)
	content = processCitations(content, manuscript.references)
	content = processFigures(content, manuscript.media)

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
			s = s.replaceAll(label, n.toString())
		}
	}
	return s
}