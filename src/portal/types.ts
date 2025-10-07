export type SymbolFormats = "web2d" | "cim";
export type CimRefUrl = `./resources/styles/cim/${string}.json`;
export type ThumbnailRefUrl = `./resources/styles/thumbnails/${string}.png`;

interface Thumbnail<T extends ThumbnailRefUrl | URL> {
	href: T;
}

export interface StyleItemCommon {
	name: string;
	title: string;
	itemType: string;
	dimensionality: string;
	category: string;
	tags: string[];
	formats: SymbolFormats[];
	// cimRef: CimRefUrl;
	// thumbnail: Thumbnail;
}

export interface UnparsedStyleItem extends StyleItemCommon {
	cimRef: CimRefUrl;
	thumbnail: Thumbnail<ThumbnailRefUrl>;
}

export interface ParsedStyleItem {
	cimRef: URL;
	thumbnail: Thumbnail<URL>;
}

type ItemType = UnparsedStyleItem | ParsedStyleItem;

export interface StyleData<T extends ItemType> {
	items: T[];
}

/**
 * Type guard that checks if the given object is a {@link StyleData} object.
 * @param obj The object to check.
 * @returns True if the object is a {@link StyleData} object, false otherwise.
 */
export const isStyleData = <T extends ItemType>(
	obj: unknown,
): obj is StyleData<T> =>
	typeof obj === "object" &&
	obj !== null &&
	"items" in obj &&
	Array.isArray(obj.items);
