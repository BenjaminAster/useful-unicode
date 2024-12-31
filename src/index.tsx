
import { css, type Config as WinzigConfig } from "winzig";

winzigConfig: ({
	output: "../",
	appfiles: "appfiles",
	css: "./main.css",
	// noCSSScopeRules: true,
	noJavaScript: true,
}) satisfies WinzigConfig;

const title = "Useful Unicode";

const controlCharacterMappings = new Map([
	[0x00, "\u2400"],
	[0x01, "\u2401"],
	[0x02, "\u2402"],
	[0x03, "\u2403"],
	[0x04, "\u2404"],
	[0x05, "\u2405"],
	[0x06, "\u2406"],
	[0x07, "\u2407"],
	[0x08, "\u2408"],
	[0x09, "\u2409"],
	[0x0A, "\u240A"],
	[0x0B, "\u240B"],
	[0x0C, "\u240C"],
	[0x0D, "\u240D"],
	[0x0E, "\u240E"],
	[0x0F, "\u240F"],
	[0x10, "\u2410"],
	[0x11, "\u2411"],
	[0x12, "\u2412"],
	[0x13, "\u2413"],
	[0x14, "\u2414"],
	[0x15, "\u2415"],
	[0x16, "\u2416"],
	[0x17, "\u2417"],
	[0x18, "\u2418"],
	[0x19, "\u2419"],
	[0x1A, "\u241A"],
	[0x1B, "\u241B"],
	[0x1C, "\u241C"],
	[0x1D, "\u241D"],
	[0x1E, "\u241E"],
	[0x1F, "\u241F"],
	[0x7F, "\u2421"],
]);

const blocks = [
	0x00,
	0x01,
	0x02,
	0x03,
	0x04,
	0x1D,
	0x1E,
	0x20,
	0x21,
	0x22,
	0x23,
	0x24,
	0x25,
	0x26,
	0x27,
	0x28,
	0x29,
	0x2A,
	0x2B,
	// 0x2C,
	// 0x2D,
	// 0x2E,
	// 0x30,
	0xFE,
	0xFF,
	0x1D1,
	0x1D4,
	0x1D5,
	0x1D6,
	0x1D7,
	0x1F0,
	0x1F1,
	0x1F3,
	0x1F4,
	0x1F5,
	0x1F6,
	0x1F7,
	0x1F8,
	0x1F9,
	0x1FA,
];

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
				gap: .2rem;
				/* justify-content: start; */
				/* grid-auto-flow: row; */
				/* inline-size: fit-content; */
				/* display: flex; */
				/* flex-wrap: wrap; */
			}
		`}
	</ul>;

	for (const block of blocks) {
		// for (let block = 0x0; block < 0x200; ++block) {
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
					`}
				</th>
			</tr>;
			for (let j = 0; j < 0x10; ++j) {
				tr.append(<th>{j.toString(16).toUpperCase()}</th>);
			}
			tHead.append(tr);
		}
		for (let i = 0; i < 0x10; ++i) {
			const tr = <tr><th>{(block * 0x10 + i).toString(16).toUpperCase()}</th></tr>;
			for (let j = 0; j < 0x10; ++j) {
				const codePoint = block * 0x100 + i * 0x10 + j;
				tr.append(<td>{
					controlCharacterMappings.get(codePoint)
					?? (String.fromCodePoint(codePoint) + (codePoint > 0x2122 ? "\uFE0F" : ""))
					// ?? String.fromCodePoint(codePoint)
				}</td>);
			}
			tBody.append(tr);
		}
		ul.append(
			// <table class:excluded={!blocks.includes(block)}>
			<table>
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

					/* &.excluded {
						color: light-dark(darkRed, red);
					} */

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
			</table>);
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

			{css`
				& {
					/* padding-inline: 1rem; */
					flex-grow: 1;
				}

				.link {
					color: light-dark(brown, sandybrown);
					text-decoration-line: underline;
				}

				code {
					background-color: light-dark(#ddd, #333);
					padding-inline: .3em;
				}
			`}
		</main>
	</body>
</html>;
