import { removeUnsupportedReviver } from "../serialization";

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
export type ClassName =
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

export interface StyleItemRow {
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

/**
 * A class representing a style definition.
 */
export class StyleItem implements Omit<StyleItemRow, "tags" | "cimJson"> {
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
		this.cim = JSON.parse(row.cimJson, removeUnsupportedReviver);
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
