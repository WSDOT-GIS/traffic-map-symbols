#!/usr/bin/env bun

import { file, stdout } from "bun";
import { Database, type SQLQueryBindings } from "bun:sqlite";
import { mkdir } from "node:fs/promises";
import { join as joinPath } from "node:path";
import {
	cimToJson,
	parseIndentCliOption,
	type CimToJsonOptions,
} from "../src/serialization";
import { StyleItem, type StyleItemRow } from "../src/stylx/items";

/**
 * Retrieves an array of StyleItem objects from an ArcGIS Style (.stylx) file, which is a SQLite database.
 * @param stylxPath The path to the ".stylx" file.
 * @yields {@link StyleItem}.
 */
function* getStyleItems(
	stylxPath: string,
): Generator<StyleItem, void, unknown> {
	{
		// Open the database
		using db = new Database(stylxPath);
		yield* queryStyleItems(db);
	}
}

/**
 * Retrieves an array of StyleItem objects from an ArcGIS Style (.stylx) file, which is a SQLite database.
 * @param db - The stylx database to query.
 * @yields {@link StyleItem}.
 */
function* queryStyleItems(db: Database): Generator<StyleItem, void, unknown> {
	const queryStatement = `
SELECT 
       KEY as key,
       i.ID as id,
       c.NAME as className,
       CATEGORY as category,
       i.NAME as name,
       TAGS as tags,
       CONTENT as cimJson
  FROM ITEMS i
JOIN CLASSES c ON c.ID = CLASS
ORDER BY CLASS`;

	// Execute the query.
	const query = db.query<StyleItemRow, SQLQueryBindings>(queryStatement);
	// Yield each row as a StyleItem.
	// query.all() was not used because it
	// does not call the object's constructor
	for (const row of query) {
		yield new StyleItem(row);
	}
}

/**
 * Write's CIM JSON files from an ArcGIS Style (.stylx) file to JSON files.
 * @param styleItem Row from SQL query of `*.stylx` file SQLite database.
 * @param outDir Output directory
 * @param options Options to control
 * @returns Path to the written file
 */
async function writeCimFile(
	styleItem: StyleItem,
	outDir: string,
	options: CimToJsonOptions,
): Promise<string> {
	const { cim, key } = styleItem;
	const cimJson = cimToJson(cim, options);
	const cimPath = joinPath(outDir, `${key}.json`);
	const f = file(cimPath);
	const lines = await f.write(cimJson);
	await stdout.write(`Wrote ${lines} bytes to ${cimPath}\n`);
	return cimPath;
}

// This section is only run if this script is being run directly as a script.
// Provides command-line interface (CLI).
if (import.meta.main) {
	const { Command } = await import("@commander-js/extra-typings");

	const program = new Command()
		.description("Dumps CIM JSON files from an ArcGIS Style (.stylx) file.")
		.argument("<stylx-file>", "Path to the .stylx file")
		.argument("<output-dir>", "Path to the output directory")
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
			'Number of spaces to indent JSON output. Valid values are "space", "tab", or a number.',
			"2",
		);

	program.parse();

	const [stylxPath, outDir] = program.args as [string, string];
	const {
		excludeUnsupported: removeUnsupportedProperties,
		wrapSymbolInCimSymbolReference,
		indent,
	} = program.opts();

	const space = parseIndentCliOption(indent);

	// Initialize an array of promises for the file operations, which will be
	// run asynchronously.
	const filePromises: Promise<string>[] = [];

	/*
	Extract style JSON strings from the stylx database, then
	group into classes (e.g., "Point Symbol", "Color", etc.)
	*/
	const groupedStyleItems = Object.groupBy(
		getStyleItems(stylxPath),
		({ className }) => className,
	);

	// Enumerate through each of the CIM JSON string groups...
	for (const [groupName, styles] of Object.entries(groupedStyleItems)) {
		// Specify the output path for the CIM files, based on the group/class name.
		const groupDir = joinPath(outDir, groupName);
		// Create the directory if it does not already exist.
		await mkdir(groupDir, { recursive: true });
		// Create a promise for each JSON string, writing it to a file.
		const styleFiles = styles.map((s) =>
			writeCimFile(s, groupDir, {
				removeUnsupportedProperties,
				wrapSymbolInCimSymbolReference,
				space,
			}),
		);
		// Add the file write promises to the array.
		filePromises.push(...styleFiles);
	}
	// Wait for all file write operations to complete.
	await Promise.all(filePromises);
	console.log("Done!");
}
