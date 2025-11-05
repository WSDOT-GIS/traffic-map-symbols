import { parseTags } from "./tags";

/**
 * Metadata of a STYLX file, from the "meta" table.
 */
export interface Meta {
	/**
	 * Stylx file version
	 * E.g., 1.0
	 */
	version?: string;
	/**
	 * CIM Version
	 * E.g., 3.5.0
	 */
	cim_version?: string;
	/**
	 * Build number (ArcGIS Pro?)
	 * E.g., 57366
	 */
	build?: `${number}`;
	/**
	 * The type of CONTENT in the ITEMS table.
	 * E.g., json
	 */
	content?: string;
	/**
	 * Color model
	 * E.g., RGB
	 */
	colorModel?: string;
	/**
	 * RGB color profile.
	 * E.g., sRGB IEC61966-2.1
	 */
	RGBColorProfile?: string;
	/**
	 * CMYK Color Profile
	 * E.g., U.S. Web Coated (SWOP) v2
	 */
	CMYKColorProfile?: string;
	/**
	 * Semicolon-separated list of tags.
	 * E.g., travel;center;traffic;alerts;cameras;mountain;weather;rest;area;travel;time;border;crossing;wait;wildland;fires;
	 */
	tags?: string;
	/**
	 * Description of the stylx file.
	 */
	description?: string;
}

export class Metadata implements Omit<Meta, "tags" | "build"> {
	version?: string | undefined;
	cim_version?: string | undefined;
	build?: number | undefined;
	content?: string | undefined;
	colorModel?: string | undefined;
	RGBColorProfile?: string | undefined;
	CMYKColorProfile?: string | undefined;
	tags: ReturnType<typeof parseTags>;
	description?: string | undefined;

	/**
	 * Creates a new instance
	 */
	constructor(options: Meta) {
		this.tags = parseTags(options.tags);
		this.build =
			options.build != null ? Number.parseInt(options.build, 10) : undefined;
		this.version = options.version;
		this.cim_version = options.cim_version;
		this.content = options.content;
		this.colorModel = options.colorModel;
		this.RGBColorProfile = options.RGBColorProfile;
		this.CMYKColorProfile = options.CMYKColorProfile;
		this.description = options.description;
	}
}
