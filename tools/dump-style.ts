#!/usr/bin/env bun

import { join as joinPath } from "node:path";
import { Database } from "bun:sqlite";

const dbPath = joinPath(import.meta.dir, "../travel-info.stylx");

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
	class: ClassName;
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

/**
 * A class representing a style definition.
 */
class StyleItem implements StyleItemRow {
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
	class: ClassName;
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

	/**
	 * Not actually called by bun query.asClass function.
	 * Only defined here to stop TypeScript from complaining
	 * about not initializing the properties.
	 * @param row properties
	 */
	constructor(row: StyleItemRow) {
		this.category = row.category;
		this.cimJson = row.cimJson;
		this.class = row.class;
		this.id = row.id;
		this.key = row.key;
		this.name = row.name;
		this.tags = row.tags;
	}

	public get cim(): Record<string, unknown> {
		return JSON.parse(this.cimJson);
	}

	public get tagSet() {
		const tags = this.tags.split(";").filter((t) => !!t);
		return tags.length ? new Set(tags) : null;
	}
}

{
	using db = new Database(dbPath);
	const queryStatement = `
SELECT 
       KEY as key,
       i.ID as id,
       c.NAME as class,
       CATEGORY as category,
       i.NAME as name,
       TAGS as tags,
       CONTENT as cimJson
  FROM ITEMS i
JOIN CLASSES c ON c.ID = CLASS
ORDER BY CLASS`;

	const query = db.query(queryStatement).as(StyleItem);
	console.table(
		query.all().map((obj) => {
			return {
				key: obj.key,
				id: obj.id,
				class: obj.class,
				category: obj.category,
				name: obj.name,
				tags: obj.tagSet,
				cim: obj.cim,
			};
		}),
		["key", "id", "class", "category", "name", "tags"],
	);
}
