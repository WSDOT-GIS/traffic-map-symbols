#!/usr/bin/env bun

import { file, stdout } from "bun";
import { Database, type SQLQueryBindings } from "bun:sqlite";
import { mkdir } from "node:fs/promises";
import { dirname, join as joinPath } from "node:path";

const rootPath = dirname(import.meta.dir);

const dbPath = joinPath(rootPath, "travel-info.stylx");

/**
 * | ID | Name                     |
 * |---:|:-------------------------|
 * |  1 | Color                    |
 * |  2 | Color Scheme             |
 * |  3 | Point Symbol             |
 * |  4 | Line Symbol              |
 * |  5 | Polygon Symbol           |
 * |  6 | Text Symbol              |
 * |  7 | North Arrow              |
 * |  8 | Scale Bar                |
 * |  9 | Standard Label Placement |
 * | 10 | Maplex Label Placement   |
 * | 11 | Grid                     |
 * | 12 | Mesh Symbol              |
 * | 13 | Legend                   |
 * | 14 | Table Frame              |
 * | 15 | Map Surround             |
 * | 17 | Legend Item              |
 * | 18 | Table Frame Field        |
 * | 19 | Area Legend Patch        |
 * | 20 | Line Legend Patch        |
 */
type ClassName =
	| "Color"
	| "Color Scheme"
	| "Point Symbol"
	| "Line Symbol"
	| "Polygon Symbol"
	| "Text Symbol"
	| "North Arrow"
	| "Scale Bar"
	| "Standard Label Placement"
	| "Maplex Label Placement"
	| "Grid"
	| "Mesh Symbol"
	| "Legend"
	| "Table Frame"
	| "Map Surround"
	| "Legend Item"
	| "Table Frame Field"
	| "Area Legend Patch"
	| "Line Legend Patch";

interface StyleItemRow {
	/**
	 * Unique string identifier
	 */
	key: string;
	/**
	 * Unique integer identifier
	 */
	id: number;
	/**
	 * The type of item
	 */
	className: ClassName;
	/**
	 * example: "WSDOT Traveler Info"
	 */
	category: string;
	/**
	 * example: "Road Alert 4 (Low)"
	 */
	name: string;
	/**
	 * semicolon-separated list of tags.
	 * example: "rgb;orange;multilayer;low;4;alert"
	 */
	tags: string;
	/**
	 * CIM definition JSON string
	 */
	cimJson: string;
}

interface CIMRGBColor {
	type: "CIMRGBColor";
	values: number[];
}

function isCimRgbColor(item: unknown): item is CIMRGBColor {
	return (
		typeof item === "object" &&
		item !== null &&
		"type" in item &&
		item.type === "CIMRGBColor" &&
		"values" in item &&
		Array.isArray(item.values)
	);
}

const bannedProperties = [
	"angleAlignment",
	"clippingPath",
	"haloSize",
] as const;

type BannedPropertyName = (typeof bannedProperties)[number] | `${string}3D`;

function isBannedProperty(key: string): key is BannedPropertyName {
	return (
		bannedProperties.includes(key as (typeof bannedProperties)[number]) ||
		key.endsWith("3D")
	);
}

function isCimVectorMarker(
	item: unknown,
): item is __esri.CIMVectorMarker & { name?: string } {
	return (
		typeof item === "object" &&
		item !== null &&
		"type" in item &&
		item.type === "CIMVectorMarker"
	);
}

/**
 * Custom JSON serializer to remove or correct CIM properties
 * to be compatible with ArcGIS Maps SDK for JavaScript.
 * @param key - name of property
 * @param value - value of property
 * @returns The value that will be assigned to the property with a name matching {@link key}.
 */
function reviver(key: string, value: unknown) {
	if (isBannedProperty(key)) {
		return;
	}
	if (key === "color" && isCimRgbColor(value)) {
		return value.values.slice(0, 3);
	}
	if (isCimVectorMarker(value)) {
		value.name = undefined;
	}

	return value;
}

/**
 * A class representing a style definition.
 */
class StyleItem implements Omit<StyleItemRow, "tags" | "cimJson"> {
	/**
	 * Unique string identifier
	 */
	key: string;
	/**
	 * Unique integer identifier
	 */
	id: number;
	/**
	 * The type of item
	 */
	className: ClassName;
	/**
	 * example: "WSDOT Traveler Info"
	 */
	category: string;
	/**
	 * example: "Road Alert 4 (Low)"
	 */
	name: string;
	/**
	 * semicolon-separated list of tags.
	 * example: "rgb;orange;multilayer;low;4;alert"
	 */
	tags: string[];
	/**
	 * CIM definition
	 */
	cim: Record<string, unknown>;

	/**
	 * Creates a new instance.
	 * @param row properties
	 */
	constructor(row: StyleItemRow) {
		this.category = row.category;
		this.cim = JSON.parse(row.cimJson, reviver);
		this.className = row.className;
		this.id = row.id;
		this.key = row.key;
		this.name = row.name;
		this.tags = row.tags.split(";").filter((t) => !!t);
	}

	// public get cim(): Record<string, unknown> {
	// 	return JSON.parse(this.cimJson);
	// }

	// public get tagSet() {
	// 	const tags = this.tags.split(";").filter((t) => !!t);
	// 	return tags.length ? new Set(tags) : null;
	// }
}
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

for (const [groupName, styles] of Object.entries(groupedStyleItems)) {
	const groupDir = joinPath(outDir, groupName);
	await mkdir(groupDir, { recursive: true });

	const writeCimFile = async ({ key, cim }: StyleItem): Promise<string> => {
		let cimJson = JSON.stringify(cim, undefined, "\t");
		try {
			const { default: CIMSymbol } = await import(
				"@arcgis/core/symbols/CIMSymbol.js"
			);
			const symbol = new CIMSymbol({
				data: {
					type: "CIMSymbolReference",
					symbol: cim as unknown as
						| __esri.CIMPointSymbol
						| __esri.CIMLineSymbol,
				},
			});
			cimJson = JSON.stringify(symbol);
		} catch (error) {
			console.error(`Error importing ${key} CIM to CIMSymbol object`, error);
			throw error;
		}
		const cimPath = joinPath(groupDir, `${key}.json`);
		const f = file(cimPath);
		const lines = await f.write(cimJson);
		stdout.write(`Wrote ${lines} bytes to ${cimPath}\n`);
		return cimPath;
	};
	const styleFiles = styles.map(writeCimFile);

	filePromises.push(...styleFiles);
}

await Promise.all(filePromises);

// // Dump output to console.
// console.log(JSON.stringify(groupedStyleItems, undefined, "\t"));
