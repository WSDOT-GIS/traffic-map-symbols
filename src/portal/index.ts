// https://wsdot.maps.arcgis.com/sharing/rest/content/items/d5f6eb510d3c4f27995278f983b61d7b/data

import type { StyleData } from "./types";

const defaultStyleItemId = "d5f6eb510d3c4f27995278f983b61d7b";
const defaultPortalUrl: Readonly<URL> = new URL(
  "https://wsdot.maps.arcgis.com/",
);

function reviver(key: string, value: unknown) {
  if (key !== "href" && key !== "cimRef" && typeof value === "string") {
    return value;
  }
}

export async function getStyleData(
  itemId = defaultStyleItemId,
  portalUrl = defaultPortalUrl,
) {
  const itemRootUrl = new URL(
    `sharing/rest/content/items/${itemId}/`,
    portalUrl,
  );
  const dataUrl = new URL("data", itemRootUrl);

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
  const data = JSON.parse(dataText, reviver) as StyleData;
  return data;
}
