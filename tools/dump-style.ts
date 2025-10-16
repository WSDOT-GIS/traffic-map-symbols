#!/usr/bin/env bun

import { file, stdout } from "bun";
import { Database, type SQLQueryBindings } from "bun:sqlite";
import { mkdir } from "node:fs/promises";
import { dirname, join as joinPath } from "node:path";
import { cimToJson, type CimToJsonOptions } from "../src/serialization";
import { StyleItem, type StyleItemRow } from "../src/stylx";

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

async function writeCimFile(
	{ key, cim }: StyleItem,
	groupDir: string,
	options: CimToJsonOptions,
): Promise<string> {
	const cimJson = cimToJson(cim, options);
	const cimPath = joinPath(groupDir, `${key}.json`);
	const f = file(cimPath);
	const lines = await f.write(cimJson);
	await stdout.write(`Wrote ${lines} bytes to ${cimPath}\n`);
	return cimPath;
}

if (import.meta.main) {
	const { Command } = await import("commander");

	const program = new Command();

	program
		.description("Dumps CIM JSON files from an ArcGIS Style (.stylx) file.")
		.argument("<stylx-file>", "Path to the .stylx file")
		.argument("<output-dir>", "Path to the output directory")
		.option(
			"--exclude-unsupported, -x",
			"Exclude CIM properties that are not supported by ArcGIS Maps SDK for JavaScript.",
		)
		.option(
			"--wrap-symbol-in-cim-symbol-reference, -r",
			"Wrap CIM symbol JSON in a CIMSymbolReference object.",
		);

	program.parse();

	const [stylxPath, outDir] = program.args;
	const options = program.opts();

	console.log(options);

	if (!stylxPath) {
		throw new Error("stylx-file is required");
	}

	if (!outDir) {
		throw new Error("output-dir is required");
	}

	const filePromises: Promise<string>[] = [];

	// Group into classes (e.g., "Point Symbol", "Color", etc.)
	const groupedStyleItems = Object.groupBy(
		getStyleItems(stylxPath),
		({ className }) => className,
	);

	for (const [groupName, styles] of Object.entries(groupedStyleItems)) {
		const groupDir = joinPath(outDir, groupName);
		await mkdir(groupDir, { recursive: true });
		const styleFiles = styles.map((s) =>
			writeCimFile(s, groupDir, {
				removeUnsupportedProperties: options.excludeUnsupported,
				wrapSymbolInCimSymbolReference: options.wrapSymbolInCimSymbolReference,
			}),
		);
		filePromises.push(...styleFiles);
	}
	await Promise.all(filePromises);
	console.log("Done!");
}
