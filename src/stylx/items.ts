import { removeUnsupportedReviver } from "../serialization";
import type { ClassName } from "./classes";
import { parseTags } from "./tags";

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
	tags: ReturnType<typeof parseTags>;
	/**
	 * CIM definition
	 */
	cim: HashMap<unknown>;

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
		this.tags = parseTags(row.tags);
	}

	// public get cim(): Record<string, unknown> {
	// 	return JSON.parse(this.cimJson);
	// }

	// public get tagSet() {
	// 	const tags = this.tags.split(";").filter((t) => !!t);
	// 	return tags.length ? new Set(tags) : null;
	// }
}
