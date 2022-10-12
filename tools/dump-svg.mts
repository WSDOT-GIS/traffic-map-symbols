/**
 * Goes through the src/symbols/IconDefinitions and
 * dump all of the SVG content to files.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import IconDefinitions from "../src/symbols/IconDefinitions.js";
import type { IconInfo } from "../src/types/IconInfo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const svgDir = join(dirname(__dirname), "src", "symbols", "svg");
await mkdir(svgDir);
console.log(svgDir);


function process(folder: string, iconDef: IconInfo) {
    const fn = join(folder, `${iconDef.id}.svg`);
    const writePromise = writeFile(fn, iconDef.paths);
    promises.push(writePromise);
}

const { layerListIcons, otherIcons } = IconDefinitions;

const promises: ReturnType<typeof writeFile>[] = [];

const iconSets = new Map([
    ["layerList", layerListIcons],
    ["other", otherIcons]
]);

for (const [folderName, iconInfos] of iconSets) {
    const folderPath = join(svgDir, folderName);
    // Make the folder if it doesn't already exist.
    await mkdir(folderPath);
    for (const iconInfo of iconInfos) {
        process(folderPath, iconInfo)
    }
}


Promise.allSettled(promises);

