import { isStyleData, type ParsedStyleItem } from "./types";

const defaultStyleItemId = "d5f6eb510d3c4f27995278f983b61d7b";
const defaultPortalUrl: Readonly<URL> = new URL(
	"https://wsdot.maps.arcgis.com/",
);

/**
 * Retrieves a StyleData object from the ArcGIS REST API.
 * @param - The ID of the item to retrieve.
 * @param - The URL of the ArcGIS Portal to retrieve the item from.
 * @returns - A promise resolved with a {@link StyleData} object from the ArcGIS REST API.
 * @throws {TypeError} - If the returned data is not in the expected format.
 */
export async function getStyleData(
	itemId = defaultStyleItemId,
	portalUrl = defaultPortalUrl,
) {
	const itemRootUrl = new URL(
		`sharing/rest/content/items/${itemId}/`,
		portalUrl,
	);
	const dataUrl = new URL("data", itemRootUrl);

	/**
	 * Converts a relative URL to an absolute URL using the item root URL.
	 * Otherwise, passes through the value unchanged.
	 * @param key - The key of the value to be reversed.
	 * @param value - The value to be reversed.
	 * @returns If value is a relative url, a URL object is returned.
	 * Otherwise, the value is returned unchanged.
	 */
	function reviver(key: string, value: unknown) {
		// Convert the relative URL to an absolute URL.
		if ((key === "href" || key !== "cimRef") && typeof value === "string") {
			return new URL(value, itemRootUrl);
		}

		// Pass through other values
		return value;
	}

	const response = await fetch(dataUrl);
	const dataText = await response.text();
	const data = JSON.parse(dataText, reviver);
	if (!isStyleData<ParsedStyleItem>(data)) {
		throw new TypeError(
			`Returned data is not in expected format\n${JSON.stringify(dataText, undefined, "\t")}`,
		);
	}
	return data;
}

/**
 * Options for the enumerateSymbols function.
 */
interface EnumerateSymbolOptions {
	/** If true, fetch the CIM JSON for each item */
	getCim?: boolean;
	/** If true, fetch the thumbnail blob for each item */
	getThumbnail?: boolean;
}

/**
 * Enumerates over a StyleData object and yields an object containing the item, and promises for the CIM JSON and thumbnail blob if requested.
 * @param data - The StyleData object to enumerate over.
 * @param options - An object containing options for the enumeration.
 * @param options.getCim - If true, fetch the CIM JSON for each item and yield a promise for the JSON.
 * @param options.getThumbnail - If true, fetch the thumbnail blob for each item and yield a promise for the blob.
 * @yields an object containing the item, and promises for the CIM JSON and thumbnail blob if requested.
 */
export function* enumerateSymbols(
	data: Awaited<ReturnType<typeof getStyleData>>,
	options: EnumerateSymbolOptions,
): Generator<
	{
		item: ParsedStyleItem;
		cim: Promise<Record<string, unknown>> | null;
		thumbnail: Promise<ArrayBuffer> | null;
	},
	void,
	unknown
> {
	for (const item of data.items) {
		const { cimRef } = item;
		const {
			thumbnail: { href: thumbnailHref },
		} = item;

		const cimPromise = options.getCim
			? fetch(cimRef).then(
					(response) => response.json() as Promise<Record<string, unknown>>,
				)
			: null;

		const thumbnailPromise = options.getThumbnail
			? fetch(thumbnailHref).then((response) => response.arrayBuffer())
			: null;

		yield {
			item,
			cim: cimPromise,
			thumbnail: thumbnailPromise,
		};
	}
}
