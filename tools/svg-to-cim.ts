#!/usr/bin/env bun

import type { Dirent } from "node:fs";
import { exists, readFile, readdir } from "node:fs/promises";
import { basename, join, relative } from "node:path";
import { cwd } from "node:process";
import {
	type CimToJsonOptions,
	cimToJson,
	parseIndentCliOption,
} from "../src/serialization";

interface CIMSymbolResponse extends Record<string, unknown> {
	type: `CIM${string}Symbol`;
	symbolLayers?: unknown[];
	[key: string]: unknown;
}

const defaultServiceUrl =
	"https://utility.arcgisonline.com/arcgis/rest/services/Utilities/Symbols/SymbolServer/generateSymbol/";

/**
 * Calls the ArcGIS generateSymbol REST API with a given SVG file.
 * @param svgFilePath - Local path to the SVG file to upload
 * @param serviceUrl - URL of the generateSymbol endpoint
 * @returns Parsed JSON of the response
 */
export async function generateSymbol(
	svgFilePath: string,
	serviceUrl = defaultServiceUrl,
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

interface WriteCimResult {
	svgPath: string;
	cimPath: string;
	byteCount: number;
}

async function writeCimJsonFromSvg(
	svgPath: string,
	url = defaultServiceUrl,
	outDir?: string,
	options?: CimToJsonOptions,
): Promise<WriteCimResult> {
	let byteCount: number = 0;
	let cimPath = relative(cwd(), svgPath.replace(".svg", ".json"));
	if (outDir) {
		cimPath = join(outDir, basename(cimPath));
	}
	// Skip generating CIM JSON file if a file with the same name already exists.
	if (await exists(cimPath)) {
		await Bun.stderr.write(`File already exists: ${cimPath}\n`);
		return {
			svgPath,
			cimPath,
			byteCount,
		};
	}
	const cim = await generateSymbol(svgPath, url);
	const jsonString = cimToJson(cim, options);
	byteCount = await Bun.write(cimPath, jsonString);
	await Bun.stderr.write(`Wrote ${byteCount} bytes to ${cimPath}\n`);
	return {
		svgPath,
		cimPath,
		byteCount,
	};
}

const hasSvgExtension = (s: string): boolean => /.svg$/i.test(s);

async function getSvgFilePaths(dirPath: string): Promise<string[]> {
	const isSvgFile = (dirEnt: Dirent<string>): boolean =>
		dirEnt.isFile() && hasSvgExtension(dirEnt.name);

	function getFilePath(dirEnt: Dirent<string>): string {
		return join(dirEnt.parentPath, dirEnt.name);
	}
	const dirEnts = await readdir(dirPath, {
		withFileTypes: true,
		recursive: true,
	});
	return dirEnts.filter(isSvgFile).map(getFilePath);
}

if (import.meta.main) {
	const { Command } = await import("@commander-js/extra-typings");
	const program = new Command()
		.description("Generate CIM JSON files from SVG files.")
		.argument("<svg-files-or-directory>...", "SVG files to process")
		.option("-o, --out-dir <output-dir>", "Path to the output directory")
		.option(
			"-u, --url <url>",
			"URL of the generateSymbol endpoint",
			defaultServiceUrl,
		)
		.option(
			"-x, --exclude-unsupported",
			"Exclude CIM properties that are not supported by ArcGIS Maps SDK for JavaScript.",
		)
		.option(
			"-r, --wrap-symbol-in-cim-symbol-reference",
			"Wrap CIM symbol JSON in a CIMSymbolReference object.",
		)
		.option(
			"-i, --indent <indent>",
			"Number of spaces to indent JSON output",
			"2",
		);
	program.parse();

	const paths = program.args;

	const {
		indent,
		url,
		outDir,
		excludeUnsupported,
		wrapSymbolInCimSymbolReference,
	} = program.opts();

	// Split the paths into directories and SVG files
	const dirs: string[] = [];
	const svgs: string[] = [];

	for (const arg of paths) {
		if (hasSvgExtension(arg)) {
			svgs.push(arg);
		} else {
			dirs.push(arg);
		}
	}

	// Get all of the SVG files in the directories
	const dirSvgs = (await Promise.all(dirs.map(getSvgFilePaths))).flat();

	// Add the SVG files to the list
	svgs.push(...dirSvgs);

	// Generate the symbols

	const promises = svgs.map((svg) =>
		writeCimJsonFromSvg(svg, url, outDir, {
			removeUnsupportedProperties: excludeUnsupported,
			wrapSymbolInCimSymbolReference,
			space: parseIndentCliOption(indent),
		}),
	);

	await Promise.all(promises);
}
