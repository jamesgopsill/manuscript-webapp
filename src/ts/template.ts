export const template = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1, shrink-to-fit=no"
		/>
		<meta name="description" content="Research for the Web">
		<title>{{title}}</title>
		<link href="https://fonts.googleapis.com/css?family=Fira Sans" rel="stylesheet">
		<style>
			* {
				margin: 0 0;
				padding: 0 0;
			}

			h1, h2, h3, h4, p, li, figcaption, .paper-media-caption, .paper-equation-label, .published-in, .created-by {
				font-family: "Fira Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
			}
			
			p {
				margin-bottom: 1em;
				/* text-indent: 1em; */
				line-height: 1.4em;
				text-align: justify;
			}

			ul, ol {
				margin-bottom: 1em;
				margin-left: 30px;
			}

			li {
				/* list-style-position: inside; */ 
				font-size: 1em;
				line-height: 1.6em;
			} 
			
			body {
				max-width: 650px;
				margin: 0 auto;
				margin-bottom: 50px;
				padding-left: 10px;
				padding-right: 10px;
			}
			
			.created-by {
				margin-top: 0px;
				margin-bottom: 0px;
				text-align: left;
				font-size: 0.8em;
				color: rgb(169, 169, 169);
			}
			
			.published-in, .created-by {
				color: rgb(169, 169, 169);
				font-size: 0.8em;
				text-indent: 0em !important;
				margin-top: 0px;
				margin-bottom: 0px;
			}
			
			.title {
				margin-bottom: 25px;
				margin-top: 25px;
				font-size: 18pt;
				font-style: italic;
				font-weight: normal;
			}
			
			.authors,
			.keywords-list {
				list-style: none;
				padding-left: 0;
				margin-bottom: 25px;
				font-size: 0.9em;
			}
			
			.keywords-list li {
				display: inline;
				text-decoration: none;
				padding-right: 10px;
			}
			
			.abstract,
			.keywords {
				margin-bottom: 5px;
			}
			
			h1,
			h2,
			h3,
			h4 {
				margin-bottom: 20px;
				margin-top: 20px;
			}

			h1, h2, h3 {
				font-size: 1.6em;
				font-weight: normal;
				font-style: italic;
			}
			
			a {
				text-decoration: none;
				color: rgb(51, 102, 187);
			}

			a:hover {
				text-decoration: underline;
			}
			
			figure {
				text-align: center;
			}
			
			figcaption,
			.paper-media-caption,
			caption {
				font-size: 0.9em;
				text-align: center;
				margin-top: 5px;
				margin-bottom: 10px;
			}
			
			img {
				max-width: 90%;
				max-height: 300px;
			}
			
			video {
				width: 100%;
			}
			
			audio {
				width: 100%;
			}
			
			.paper-data {
				text-align: center;
			}
			
			.paper-display-equation {
				width: 100%;
				margin-bottom: 10px;
			}
			.paper-equation {
				width: 95% !important;
				font-size: 1.2em;
			}
			.paper-equation-label {
				width: 5%;
				font-size: 1em !important;
			}
			
			th {
				border-bottom: 1px solid black;
			}
			
			th,
			td {
				padding: 2px;
			}
			
			.citations {
				list-style-position: inside;
				font-size: 1em;
			}

			mjx-container {
				font-size: 1.0em !important;
			}
		</style>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/css/splide.min.css"></link>
		<style>
			.splide__slide {
				text-align: center;
			}
			.splide__slide img {
				width: auto;
				height: 400px;
			}
		</style>
	</head>
	<body>
		<p class="published-in">Publication: {{publication}}</p>
		<p class="published-in">Date: {{date}}</p>
		<p class="published-in">doi: {{doi}}</p>
		<p class="created-by">
			Created using
			<a href="http://jamesgopsill.github.io/manu-script">ManuScript</a>
		</p>
		<h1 class="title">{{title}}</h1>

		<ul class="authors">
			{{authors}}
		</ul>

		<h4 class="abstract">Abstract</h4>

		{{abstract}}

		<h4 class="keywords">Keywords</h4>

		<ul class="keywords-list">
			{{keywords}}
		</ul>

		{{content}}

		<h4 class="references">References</h4>

		<ol class="citations">
			{{citations}}
		</ol>

		<script>
			MathJax = {
				tex: {
					inlineMath: [['$', '$']]
				},
				output: {
					font: "mathjax-fira"
				}
			};
		</script>
		<!--
		<script
			id="MathJax-script"
			async
			src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
		>
		-->
		<script
			id="MathJax-script"
			async
			src="https://cdn.jsdelivr.net/npm/mathjax@4.0.0-alpha.1/es5/tex-mml-chtml.js"
		>
		</script>
		<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.7/dist/js/splide.min.js"></script>
		<script>
			const carousels = document.getElementsByClassName("splide")
			for (const c of carousels) {
				const options = {
					pagination: false
				}
				new Splide(c, options).mount()
			}
		</script>
	</body>
</html>
`
