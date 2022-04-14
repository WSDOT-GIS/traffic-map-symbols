/**
 * This module is for detecting temporary themes on the main WSDOT public
 * website, e.g., "Go Orange".
 * 
 * This file was copied from https://github.com/WSDOT-GIS/WsdotThemeUtils.
 * If you need to update this module, please update that version as well.
 */

export const SAFETY_CSS_SELECTOR = "link[href*='safety.css'][rel='stylesheet']";

/**
 * Fetches a webpage and looks for specific CSS links.
 * 
 * @param url URL to search for go orange CSS links
 * @param selector CSS selector that will be used with {@link:Document.querySelectorAll}
 * @returns Returns an array of links that match, or null if no matching CSS links were found in the document.
 */
export async function detectGoOrange(url = "https://www.wsdot.wa.gov", selector: string = SAFETY_CSS_SELECTOR) {
    const response = await fetch(url);
    const markup = await response.text();
    return detectThemeCss(markup, selector);
}

/**
 * Looks for specific CSS links in an HTML document.
 * 
 * @param markup HTML markup that will be parsed by {@link:DomParser}
 * @param selector CSS selector that will be used with {@link:Document.querySelectorAll}
 * @returns Returns a {@link:NodeList} of links that match, or null if no matching CSS links were found in the document.
 */
export function detectThemeCss<T extends Element>(markup: string, selector: string  = SAFETY_CSS_SELECTOR) {
    const domParser = new DOMParser();
    const htmlDoc = domParser.parseFromString(markup, "text/html");
    // Search for <link rel="stylesheet" href="css/safety.css">
    const links = htmlDoc.querySelectorAll<T>(selector);
    return links.length ? links : null;
}
