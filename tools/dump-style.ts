#!/usr/bin/env bun

import { file, stdout } from "bun";
import { Database, type SQLQueryBindings } from "bun:sqlite";
import { mkdir } from "node:fs/promises";
import { dirname, join as joinPath } from "node:path";
import { cimToJson } from "../src/serialization";
import { StyleItem, type StyleItemRow } from "../src/stylx";

const rootPath = dirname(import.meta.dir);

const dbPath = joinPath(rootPath, "travel-info.stylx");

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
}

// Group into classes (e.g., "Point Symbol", "Color", etc.)
const groupedStyleItems = Object.groupBy(
	getStyleItems(dbPath),
	({ className }) => className,
);

const outDir = joinPath(rootPath, "src", "CIM from stylx");

const filePromises: Promise<string>[] = [];

async function writeCimFile(
	{ key, cim }: StyleItem,
	groupDir: string,
): Promise<string> {
	const cimJson = cimToJson(cim, {
		removeUnsupportedProperties: true,
		wrapSymbolInCimSymbolReference: true,
		space: "\t",
	}); // JSON.stringify(cim, undefined, "\t");
	const cimPath = joinPath(groupDir, `${key}.json`);
	const f = file(cimPath);
	const lines = await f.write(cimJson);
	await stdout.write(`Wrote ${lines} bytes to ${cimPath}\n`);
	return cimPath;
}

for (const [groupName, styles] of Object.entries(groupedStyleItems)) {
	const groupDir = joinPath(outDir, groupName);
	await mkdir(groupDir, { recursive: true });
	const styleFiles = styles.map((s) => writeCimFile(s, groupDir));
	filePromises.push(...styleFiles);
}

await Promise.all(filePromises);

console.log("Done!");
