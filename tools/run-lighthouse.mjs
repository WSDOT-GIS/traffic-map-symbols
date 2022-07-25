import { writeFile } from "fs/promises";
import lighthouse from "lighthouse";
import chromeLauncher from "chrome-launcher"
import { exec } from "node:child_process"
import { exit } from "process";
import { time, timeEnd } from "console";

/**
 * Extracts the local URL from a `vue-cli-service serve` stderr message.
 * @param {string} message - Message coming from {@link exec}
 * @example
 * ```shell
 * App running at:
 *   - Local:   http://localhost:8080/Travel/Real-time/Map/ (copied to clipboard)
 *   - Network: http://192.168.0.22:8080/Travel/Real-time/Map/
 * ```
 * @returns {(string|null)} Returns a URL string if the match was successful, 
 * null otherwise.
 */
function getUrlFromMessage(message) {
    const urlRe = /(?<=Local:\s*)https?:\/\/\S+/ig;
    const match = message.match(urlRe);
    if (match) {
        return match[0];
    }
    return null;
}

/**
 * Runs the lighthouse tool.
 * @param {string} url - URL of the localhost URL.
 * @example http://localhost:8080/Travel/Real-time/Map/
 * @param {ChildProcess} vueServe - The vue-cli-server serve process.
 */
async function runLighthouse(url, vueServe) {
    // http://localhost:8080/Travel/Real-time/Map/

    // Append trailing slash to URL if it is not present.
    if (!url.endsWith("/")) {
        url += "/";
    }
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', "--allow-insecure-localhost"] });
    // const options = { logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port };
    const options = {
        output: "html",
        port: chrome.port
    };
    const runnerResult = await lighthouse(url, options);

    // `.report` is the HTML report as a string
    const reportHtml = runnerResult.report;
    const reportFileName = 'lhreport.html';
    await writeFile(reportFileName, reportHtml);

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl);
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

    await chrome.kill();
    vueServe.kill();
}

const timerLabel = "operation";
time(timerLabel);

(async () => {
    console.log("Starting vue-cli-service serve...");
    const vueServe = exec("npx vue-cli-service serve --mode production");
    vueServe.stdout.on("data", async (chunk) => {
        console.log(chunk);
        const url = getUrlFromMessage(chunk);
        if (!url) return;
        console.log(`URL found: ${url}. Running Lighthouse...`);
        await runLighthouse(url, vueServe);
        console.log("Completed running Lighthouse.");
        exit();
    });
})();

timeEnd(timerLabel);


