/**
 * Runs the lighthouse tool.
 * @see https://developer.chrome.com/docs/lighthouse/
 */

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
    const chrome = await chromeLauncher.launch({
        // See https://github.com/GoogleChrome/chrome-launcher/blob/master/docs/chrome-flags-for-tools.md
        chromeFlags: [
            '--headless',
            "--allow-insecure-localhost",
            "--disable-client-side-phishing-detection", //  Disables client-side phishing detection
            "--disable-component-extensions-with-background-pages", //  Disable some built-in extensions that aren't affected by --disable-extensions
            "--disable-default-apps", //  Disable installation of default apps
            "--disable-extensions", //  Disable all chrome extensions
            "--mute-audio", //  Mute any audio
            "--no-default-browser-check", //  Disable the default browser check, do not prompt to set it as such
            "--no-first-run", //  Skip first run wizards

            "--allow-running-insecure-content", // 
            "--autoplay-policy=user-gesture-required", //  Don't render video
            "--disable-background-timer-throttling", //  Disable timers being throttled in background pages/tabs
            "--disable-backgrounding-occluded-windows", // 
            "--disable-features=ScriptStreaming", //  V8 script streaming   
            "--disable-hang-monitor", // 
            "--disable-ipc-flooding-protection", //  Some javascript functions can be used to flood the browser process with IPC. By default, protection is on to limit the number of IPC sent to 10 per second per frame. This flag disables it. https://crrev.com/604305
            "--disable-notifications", //  Disables the Web Notification and the Push APIs.
            "--disable-popup-blocking", //  Disable popup blocking. --block-new-web-contents is the strict version of this.
            "--disable-prompt-on-repost", //  Reloading a page that came from a POST normally prompts the user.
            "--disable-device-discovery-notifications",
            "--enable-automation",
            "--enable-logging=stderr",
            "--log-level=0",
            "--password-store=basic",

            "--silent-debugger-extension-api", // Does not show an infobar when a Chrome extension attaches to a page using chrome.debugger page. Required to attach to extension background pages.


            "--disable-background-networking", //  Disable various background network services, including extension updating,safe browsing service, upgrade detector, translate, UMA
            "--disable-breakpad", //  Disable crashdump collection (reporting is already disabled in Chromium)
            "--disable-component-update", //  Don't update the browser 'components' listed at chrome://components/
            "--disable-domain-reliability", //  Disables Domain Reliability Monitoring, which tracks whether the browser has difficulty contacting Google-owned sites and uploads reports to Google.
            "--disable-sync", //  Disable syncing to a Google account
            // "--enable-crash-reporter-for-testing", //  Used for turning on Breakpad crash reporting in a debug environment where crash reporting is typically compiled but disabled.
            "--metrics-recording-only", //  Disable reporting to UMA, but allows for collection

        ]
    });
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

(async () => {
    console.log("Starting vue-cli-service serve...");
    const vueServe = exec("npx vue-cli-service serve --mode production");
    vueServe.stdout.on("data", async (chunk) => {
        console.log(chunk);
        const url = getUrlFromMessage(chunk);
        if (!url) return;
        console.log(`URL found: ${url}. Running Lighthouse...`);
        try {
            await runLighthouse(url, vueServe);
        } catch (error) {
            console.error(error);
        }
        console.log("Completed running Lighthouse.");
        exit();
    });
})();



