#!/usr/bin/env bun

import type { Dirent } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { basename, join } from "node:path";

interface CIMSymbolResponse extends Record<string, unknown> {
	type: `CIM${string}Symbol`;
	symbolLayers?: unknown[];
	[key: string]: unknown;
}

/**
 * Calls the ArcGIS generateSymbol REST API with a given SVG file.
 * @param svgFilePath - Local path to the SVG file to upload
 * @param serviceUrl - URL of the generateSymbol endpoint
 * @returns Parsed JSON of the response
 */
export async function generateSymbol(
	svgFilePath: string,
	serviceUrl = "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/Symbols/SymbolServer/generateSymbol/",
): Promise<CIMSymbolResponse> {
	// Construct endpoint URL
	const url = new URL(serviceUrl);
	// Read the SVG file as a buffer
	const fileBuf = await readFile(svgFilePath);

	// Create a Blob from the buffer
	const blob = new Blob([fileBuf], {
		// Optionally set MIME type
		type: "image/svg+xml",
	});

	// Build form data
	const form = new FormData();
	form.append("svgImage", blob, basename(svgFilePath));
	form.append("f", "json");

	// (Optional) If your service requires an API key / token, append it:
	// form.append("token", yourToken);

	// Send the POST request via fetch
	const resp = await fetch(url, {
		method: "POST",
		body: form,
		// Do not explicitly set "Content-Type" when using FormData; fetch / Bun will set it including the boundary. :contentReference[oaicite:1]{index=1}
		// headers: { … }  // if needed (e.g. Authorization)
	});

	if (!resp.ok) {
		const txt = await resp.text();
		throw new Error(`HTTP ${resp.status} ${resp.statusText}: ${txt}`);
	}

	const data = (await resp.json()) as CIMSymbolResponse;
	return data;
}

// Example invocation when running with Bun:
if (import.meta.main) {
	const args = process.argv.slice(2);

	const urlParamRe = /(?<=^--url=|\s+).*$/;
	let url: string | undefined;
	let dirs: string[] = [];
	let svgs: string[] = [];

	for (const arg of args) {
		// If the arg starts with "--url=", use it as the URL
		// Skip if url has already been assigned a value.
		const match = url ? arg.match(urlParamRe) : null;
		if (match) {
			url = match[0];
		} else if (arg.endsWith(".svg")) {
			svgs.push(arg);
		} else {
			dirs.push(arg);
		}
	}

	const isSvgFile = (f: Dirent<string>): boolean =>
		f.isFile() && f.name.endsWith(".svg");

	const getFilePath = (f: Dirent<string>): string => join(f.parentPath, f.name);

	const getSvgFilePaths = async (d: string): Promise<string[]> =>
		(await readdir(d, { withFileTypes: true, recursive: true }))
			.filter(isSvgFile)
			.map(getFilePath);

	// Get all of the SVG files in the directories
	const dirSvgs = (await Promise.all(dirs.map(getSvgFilePaths))).flat();

	// Add the SVG files to the list
	svgs.push(...dirSvgs);

	// Generate the symbols
	// await Promise.all(svgs.map((svgPath) => generateSymbol(svgPath, url)));

	const promises = svgs.map(async (svgPath) => {
		const cim = await generateSymbol(svgPath, url);
		const cimPath = svgPath.replace(".svg", ".json");
		const byteCount = await Bun.write(
			cimPath,
			JSON.stringify(cim, undefined, "\t"),
		);
		Bun.stderr.write(`Wrote ${byteCount} bytes to ${cimPath}\n`);
		return {
			svgPath,
			cimPath,
			byteCount,
		};
	});

	await Promise.all(promises);
}
