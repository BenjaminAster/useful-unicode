
import { css, type Config as WinzigConfig } from "winzig";
import { controlCharacterMappings, blocks, nonPrintableCharacters } from "./constants.ts";

winzigConfig: ({
	output: "../",
	appfiles: "appfiles",
	css: "./main.css",
	// noCSSScopeRules: true,
	noJavaScript: true,
}) satisfies WinzigConfig;

const title = "Useful Unicode";

const ucd = new Set((
	await (await fetch("https://unicode.org/Public/draft/UCD/ucd/UnicodeData.txt")).text()
	// await (await fetch("https://unicode.org/Public/UCD/latest/ucd/UnicodeData.txt")).text()
	// await (await fetch("https://unicode.org/Public/12.0.0/ucd/UnicodeData.txt")).text()
).split("\n").map(line => parseInt(line.split(";")[0], 16)));


const Tables = () => {
	const ul = <ul>
		{css`
			& {
				line-height: 1.2;
				font-size: .7rem;
				/* columns: 5; */
				padding: 0;
				margin: 0;
				list-style: none;
				display: grid;
				grid-template-columns: repeat(4, auto);
				gap: 3px;
				/* justify-content: start; */
				/* grid-auto-flow: row; */
				/* inline-size: fit-content; */
				/* display: flex; */
				/* flex-wrap: wrap; */
			}
		`}
	</ul>;

	for (const block of blocks) {
		// for (let block = 0x0; block < 0xF00; ++block) {
		const tHead = <thead></thead>;
		const tBody = <tbody></tbody>;
		{
			const tr = <tr>
				<th>
					{block.toString(16).toUpperCase()}
					{css`
						& {
							inline-size: 4.5ch;
							color: light-dark(white, black);
							background-color: light-dark(black, white);
						}

						.excluded & {
							background-color: red;
						}
					`}
				</th>
			</tr>;
			for (let j = 0; j < 0x10; ++j) {
				tr.append(<th>{j.toString(16).toUpperCase()}</th>);
			}
			tHead.append(tr);
		}
		let containsUnicodeCharacters = false;
		for (let i = 0; i < 0x10; ++i) {
			const tr = <tr><th>{(block * 0x10 + i).toString(16).toUpperCase()}</th></tr>;
			for (let j = 0; j < 0x10; ++j) {
				const codePoint = block * 0x100 + i * 0x10 + j;
				tr.append(
					ucd.has(codePoint)
						? (containsUnicodeCharacters = true, <td>{
							controlCharacterMappings.get(codePoint)
							?? (String.fromCodePoint(codePoint) + (codePoint > 0x2122 ? "\uFE0F" : ""))
							// ?? String.fromCodePoint(codePoint)
						}</td>)
						: <td class="unused-code-point"></td>
				);
			}
			tBody.append(tr);
		}
		if (containsUnicodeCharacters) ul.append(
			<table class:excluded={!blocks.includes(block)}>
				{/* <table> */}
				{tHead}
				{tBody}
				{css`
					& {
						width: 100%;
						border-collapse: collapse;
						/* border-collapse: separate; */
						/* border-spacing: 0; */
						table-layout: fixed;
						text-align: center;
						break-inside: avoid;
						/* outline: 1px solid light-dark(black, white); */
						/* outline-offset: -1px; */
					}

					td, th {
						/* border: 1px solid light-dark(#bbb, #444); */
						border: 0 solid var(--text);
						padding: 0;
						background-clip: padding-box;
						/* border-block-start: 0 none; */
						/* border-inline-start: 0 none; */
					}

					th {
						/* border-color: light-dark(black, white); */
						font-family: monospace;
						background-color: light-dark(#e8e8e8, #222);
						/* min-inline-size: 3ch; */
					}

					thead th {
						border-block-start-width: 1px;
					}

					th:first-child {
						border-inline-start-width: 1px;
					}

					tr > :nth-child(4n + 1) {
						border-inline-end-width: 1px;
					}

					thead > tr > *,
					tbody > tr:nth-child(4n) > * {
						border-block-end-width: 1px;
					}

					tbody > tr:nth-child(odd) > td:nth-child(even),
					tbody > tr:nth-child(even) > td:nth-child(odd) {
						background-color: light-dark(#eeeeee, #222222);
					}

					.unused-code-point::before {
						content: "X";
						color: red;
					}

					/* thead > tr > th:is(:nth-child(8n + 6), :nth-child(8n + 7), :nth-child(8n + 8), :nth-child(8n + 9)),
					tbody > tr:is(:nth-child(8n + 5), :nth-child(8n + 6), :nth-child(8n + 7), :nth-child(8n + 8)) > th,
					tbody > tr:is(:nth-child(8n + 1), :nth-child(8n + 2), :nth-child(8n + 3), :nth-child(8n + 4)) > td:is(:nth-child(8n + 2), :nth-child(8n + 3), :nth-child(8n + 4), :nth-child(8n + 5)),
					tbody > tr:is(:nth-child(8n + 5), :nth-child(8n + 6), :nth-child(8n + 7), :nth-child(8n + 8)) > td:is(:nth-child(8n + 6), :nth-child(8n + 7), :nth-child(8n + 8), :nth-child(8n + 9)) {
						background-color: light-dark(#ddd, #222);
					} */

					/* 
					thead > tr > th:is(:nth-child(8n + 2), :nth-child(8n + 3), :nth-child(8n + 4), :nth-child(8n + 5)),
					tbody > tr:is(:nth-child(8n + 1), :nth-child(8n + 2), :nth-child(8n + 3), :nth-child(8n + 4)) > *,
					tbody > tr > td:is(:nth-child(8n + 2), :nth-child(8n + 3), :nth-child(8n + 4), :nth-child(8n + 5)) {
						background-color: light-dark(#eee, #222);
					} */

					/* tbody > tr:is(:nth-child(8n + 1), :nth-child(8n + 2), :nth-child(8n + 3), :nth-child(8n + 4)) > td:is(:nth-child(8n + 2), :nth-child(8n + 3), :nth-child(8n + 4), :nth-child(8n + 5)) {
						background-color: light-dark(#eee, #222);
					} */
				`}
			</table>
		);
	}

	return ul;
};

;
<html lang="en">
	<head>
		<title>{title}</title>
	</head>
	<body>
		<main>
			<Tables />

			<h2>Non-printable characters:</h2>

			<ul>
				{...nonPrintableCharacters.map(([codePoint, name]) =>
					<li><code>{codePoint}</code>: {name}</li>
				)}

				{css`
					& {
						line-height: 1.2;
						padding: 0;
						margin: 0;
						list-style: none;
						columns: 4;
						column-gap: 3px;
						font-size: .6rem;
					}
				`}
			</ul>

			{css`
				& {
					/* padding-inline: 1rem; */
					flex-grow: 1;
				}

				h2 {
					font-size: .9rem;
					font-weight: normal;
					margin-block: 1rem .5rem;
				}
			`}
		</main>
	</body>
</html>;
