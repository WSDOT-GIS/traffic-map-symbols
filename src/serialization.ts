/// <reference types="@arcgis/core/interfaces" />

type CimRgbColorTuple = [r: number, g: number, b: number, alphaPercent: number];

export type RgbaTuple = [r: number, g: number, b: number, a: number];

interface CimObject extends Record<string, unknown> {
	type: `CIM${string}`;
}

interface CimRgbColor extends CimObject {
	type: "CIMRGBColor";
	/**
	 * An array of four integers: `[r, g, b, alphaPercent]`
	 * where `r`, `g`, and `b` are in the range 0-255 and `alphaPercent` is in the range 0-100.
	 */
	values: CimRgbColorTuple;
}

export function toRgbaTuple(cimRgbColor: CimRgbColor): RgbaTuple {
	const {
		values: [r, g, b, apct],
	} = cimRgbColor;
	const a = apct / 100;
	return [r, g, b, a];
}

function isCimRgbColor(item: unknown): item is CimRgbColor {
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

type CimSymbol = NonNullable<__esri.CIMSymbolReference["symbol"]>;
// | __esri.CIMLineSymbol
// | __esri.CIMPointSymbol
// | __esri.CIMPolygonSymbol
// | __esri.CIMTextSymbol;

function isCimSymbol(item: unknown): item is CimSymbol {
	return (
		typeof item === "object" &&
		item !== null &&
		"type" in item &&
		typeof item.type === "string" &&
		/^CIM\w+Symbol$/.test(item.type)
	);
}

/**
 * Custom JSON serializer reviver functin to remove or correct CIM properties
 * to be compatible with ArcGIS Maps SDK for JavaScript.
 * @param key - name of property
 * @param value - value of property
 * @returns The value that will be assigned to the property with a name matching {@link key}.
 */
export function removeUnsupportedReviver(key: string, value: unknown) {
	if (isBannedProperty(key)) {
		return;
	}
	if (key === "color" && isCimRgbColor(value)) {
		return toRgbaTuple(value);
	}
	if (isCimVectorMarker(value)) {
		value.name = undefined;
	}

	return value;
}

/**
 * Options for {@link cimToJson}.
 */
export interface CimToJsonOptions {
	/**
	 * If `true`, properties that are not supported by {@link __esri.CIMSymbolProperties} will be removed.
	 */
	removeUnsupportedProperties?: boolean;
	/**
	 * If `true`, the symbol will be wrapped in a {@link __esri.CIMSymbolReference} object.
	 */
	wrapSymbolInCimSymbolReference?: boolean;
	/**
	 * Number of spaces to indent nested objects, or a string to serve as the indentation.
	 * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters|JSON.stringify() parameters}.
	 */
	space?: Parameters<typeof JSON.stringify>[2];
}

/**
 * Converts a CIM object to a JSON string, optionally removing
 * properties that are not supported by {@link __esri.CIMSymbolProperties}.
 * @param item - Item to be converted to a JSON string.
 * @param options - Options to customize serialization.
 * @returns - A JSON representation of {@link item}.
 */
export function cimToJson(item: unknown, options?: CimToJsonOptions) {
	const reviver = options?.removeUnsupportedProperties
		? removeUnsupportedReviver
		: undefined;
	let objectToSerialize: unknown = item;
	if (isCimSymbol(item) && options?.wrapSymbolInCimSymbolReference) {
		objectToSerialize = {
			type: "CIMSymbolReference",
			symbol: item,
		} as __esri.CIMSymbolReference;
	}
	return JSON.stringify(objectToSerialize, reviver, options?.space);
}
