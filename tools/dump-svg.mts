/**
 * Goes through the src/symbols/IconDefinitions and
 * dump all of the SVG content to files.
 * 
 * ```console
 * npx ts-node --esm .\tools\dump-svg.mts
 * ```
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { layerListIcons, otherIcons, IconInfo } from "../src/symbols/IconDefinitions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const svgDir = join(dirname(__dirname), "src", "symbols", "svg");
await mkdir(svgDir, {
    recursive: true
});
console.log(svgDir);

/**
 * Writes the SVG files from icon definition
 * @param folder - The folder that the SVG file will be written to.
 * @param iconDef - Icon definition, including name and SVG markup.
 */
function process(folder: string, iconDef: IconInfo) {
    const fn = join(folder, `${iconDef.id}.svg`);
    const writePromise = writeFile(fn, iconDef.paths);
    promises.push(writePromise);
}

// Mapping of IconInfo arrays to folder names.
const iconSets = new Map([
    ["layerList", layerListIcons],
    ["other", otherIcons]
]);

// Create array of promises for creation of SVG files.
const promises: ReturnType<typeof writeFile>[] = [];

for (const [folderName, iconInfos] of iconSets) {
    const folderPath = join(svgDir, folderName);
    // Make the folder if it doesn't already exist.
    await mkdir(folderPath, { recursive: true });
    for (const iconInfo of iconInfos) {
        process(folderPath, iconInfo)
    }
}


Promise.allSettled(promises);

