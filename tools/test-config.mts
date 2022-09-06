/**
 * Tests the configuration files to see if their URLs are valid.
 *
 * @example
 * ```pwsh
 * C:\Users\YourUserName\source\repos\TravelerInformationCoreMap [develop-config-test ≡ +0 ~1 -0 !]> npx ts-node --esm .\tools\test-config.mts
 * (node:11564) ExperimentalWarning: Importing JSON modules is an experimental feature. This feature could change at any time
 * (Use `node --trace-warnings ...` to show where the warning was created)
 * (node:11564) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
 * (node:11564) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
 * ┌─────────┬────────────────┬──────────────────────┬───────┬────────┬─────────────┬───────────┬──────────────┬───────────┬──────────────┬──────────────────────────────────────────────────────────────────────────────────┐
 * │ (index) │   configName   │     propertyName     │  ok   │ status │ statusText  │ errorName │ errorMessage │ causeName │ causeMessage │                                       url                                        │
 * ├─────────┼────────────────┼──────────────────────┼───────┼────────┼─────────────┼───────────┼──────────────┼───────────┼──────────────┼──────────────────────────────────────────────────────────────────────────────────┤
 * │    0    │ 'appConfigPro' │ 'forecastSummaryAPI' │ false │  404   │ 'Not Found' │   null    │     null     │   null    │     null     │        'https://wsdot.com/travel/real-time/service/api/ForecastSummary/'         │
 * │    1    │ 'appConfigQA'  │ 'forecastSummaryAPI' │ false │  404   │ 'Not Found' │   null    │     null     │   null    │     null     │ 'https://wsdotappsqa.wsdot.wa.gov/travel/real-time/service/api/ForecastSummary/' │
 * │    2    │ 'appConfigDev' │ 'forecastSummaryAPI' │ false │  404   │ 'Not Found' │   null    │     null     │   null    │     null     │        'https://wsdot.com/travel/real-time/service/api/ForecastSummary/'         │
 * └─────────┴────────────────┴──────────────────────┴───────┴────────┴─────────────┴───────────┴──────────────┴───────────┴──────────────┴──────────────────────────────────────────────────────────────────────────────────┘
 * The following properties are not present in all configuration files.
 * ┌─────────┬──────────────────────────┬───────────┬──────────────┬─────────────┬──────────────┐
 * │ (index) │           name           │ appConfig │ appConfigPro │ appConfigQA │ appConfigDev │
 * ├─────────┼──────────────────────────┼───────────┼──────────────┼─────────────┼──────────────┤
 * │    0    │  'currentRoadAlertLine'  │   true    │    false     │    true     │     true     │
 * │    1    │ 'currentRoadAlertPoint'  │   true    │    false     │    true     │     true     │
 * │    2    │ 'currentRoadClosureLine' │   true    │    false     │    true     │     true     │
 * │    3    │   'forecastSummaryAPI'   │   false   │     true     │    true     │     true     │
 * └─────────┴──────────────────────────┴───────────┴──────────────┴─────────────┴──────────────┘
 * ```
 */

import { env } from "node:process";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import appConfig from "../public/appconfig.json" assert { type: "json" };
import appConfigPro from "../public/appconfigPro.json" assert { type: "json" };
import appConfigQA from "../public/appconfigQA.json" assert { type: "json" };
import appConfigDev from "../public/appconfigDev.json" assert { type: "json" };

// Need to disable this for testing intranet resources.
env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

type AppConfig = Record<string, unknown> &
  Partial<typeof appConfig & typeof appConfigPro & typeof appConfigQA & typeof appConfigDev>;

type TestResult = {
  configName: string;
  propertyName: string;
  ok: boolean;
  status: number | null;
  statusText: string | null;
  errorName: string | null;
  errorMessage: string | null;
  causeName: string | null;
  causeMessage: string | null;
  cleanedUrl: string | null;
  url: string;
};

const configs = new Map<string, AppConfig>([
  ["appConfig", appConfig],
  ["appConfigPro", appConfigPro],
  ["appConfigQA", appConfigQA],
  ["appConfigDev", appConfigDev],
]);

const propertyNames = new Set<string>();

/** Matches a URL with http or https protocol */
const urlRe = /^https?:\/\//i;

/**
 * Creates a "cleaned-up" version of the input URL by removing
 * unnecessary search parameters.
 * @param configName - Configuration name
 * @param propertyName - Property Name
 * @param url - URL
 * @returns A URL if there are search parameters that could be removed. Null otherwise.
 */
function detectUnneededSearchParams(configName: string, propertyName: string, url: string | URL) {
  const unneededIfNoGeometry = ["geometryType", "spatialRel"];
  const unneededIfFalse = [
    "applyVCSProjection",
    "returnIdsOnly",
    "returnUniqueIdsOnly",
    "returnCountOnly",
    "returnExtentOnly",
    "returnQueryGeometry",
    "returnDistinctValues",
  ];
  url = url instanceof URL ? url : new URL(url);
  const unneeded = new Array<string>();
  const geometryParamHasValue =
    url.searchParams.has("geometry") && url.searchParams.get("geometry");

  for (const [key, value] of url.searchParams) {
    if (
      value === "" ||
      value === null ||
      (value === "false" && key in unneededIfFalse) ||
      (!geometryParamHasValue && key in unneededIfNoGeometry)
    ) {
      unneeded.push(key);
    }
  }
  let newUrl: URL | null = null;

  if (unneeded.length > 0) {
    newUrl = new URL(url);
    console.group(
      `${configName}: ${propertyName}\nThe following search parameters appear to be unnecessary ${
        url.href.split("?")[0]
      }:`
    );
    for (const key of unneeded) {
      console.log(key);
      newUrl.searchParams.delete(key);
    }
    console.groupEnd();
  }

  return newUrl;
}

/**
 * Detects if the URL ends in "MapServer", and if it does,
 * adds "f=json" search parameter. This is because some map
 * services have their directory browsing disabled.
 * If it is not a MapServer URL, the original URL is returned.
 * @param url - A URL.
 * @returns A URL.
 */
function ensureMapServiceUrlHasFParamIfNeeded(url: string) {
  const mapServiceUrlRe = /\/MapServer\/?$/i;
  const inputUrl = new URL(url);
  const match = inputUrl.pathname.match(mapServiceUrlRe);
  if (!match) {
    return inputUrl;
  }
  inputUrl.searchParams.set("f", "json");
  return inputUrl;
}

async function testUrl(configName: string, propertyName: string, url: string): Promise<TestResult> {
  const cleanedUrl = detectUnneededSearchParams(configName, propertyName, url);
  const modifiedUrl = ensureMapServiceUrlHasFParamIfNeeded(url);

  try {
    let result = await fetch(modifiedUrl, {
      method: "HEAD",
    });
    // If "HEAD" request is not supported, status 405, "Method Not Allowed", is returned.
    // In this case, do a regular "GET" request.
    if (result.status === 405) {
      result = await fetch(modifiedUrl, { method: "GET" });
    }
    const { ok, status, statusText } = result;
    return {
      configName,
      propertyName,
      ok,
      status,
      statusText,
      errorName: null,
      errorMessage: null,
      causeName: null,
      causeMessage: null,
      cleanedUrl: cleanedUrl?.href || null,
      url: modifiedUrl.href,
    };
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }
    let causeName: string | null = null;
    let causeMessage: string | null = null;
    if (error.cause) {
      if (error.cause instanceof Error) {
        causeName = error.cause.name;
        causeMessage = error.cause.message;
      }
    }
    return {
      configName,
      propertyName,
      ok: false,
      status: null,
      statusText: null,
      errorName: error.name,
      errorMessage: error.message,
      causeName,
      causeMessage,
      cleanedUrl: cleanedUrl?.href || null,
      url: modifiedUrl.href,
    };
  }
}

function testUrlProperties(appConfig: AppConfig, configName: string, skipFetch = false) {
  const promises = new Array<Promise<TestResult | void>>();
  for (const propertyName in appConfig) {
    if (Object.prototype.hasOwnProperty.call(appConfig, propertyName)) {
      propertyNames.add(propertyName);
      const value = appConfig[propertyName];
      if (typeof value !== "string" || !urlRe.test(value)) {
        continue;
      }

      const promise = skipFetch ? Promise.resolve() : testUrl(configName, propertyName, value);

      promises.push(promise);
    }
  }
  return promises;
}

function testConfigs(skipFetch = false) {
  const promises = new Array<Promise<TestResult | void>>();
  for (const [configName, config] of configs) {
    promises.push(...testUrlProperties(config, configName, skipFetch));
  }
  return promises;
}

type MissingPropertyResult = Record<string, string | boolean>;

function* getMissingPropertyNames(
  configs: Map<string, AppConfig>,
  propertyNames: Set<keyof AppConfig>
) {
  for (const propertyName of propertyNames) {
    const record: MissingPropertyResult = {
      name: propertyName,
    };
    let anyMissing = false;
    for (const [configName, config] of configs) {
      const isCurrentPresent = Object.prototype.hasOwnProperty.call(config, propertyName);
      if (!isCurrentPresent) {
        anyMissing = true;
      }
      record[configName] = isCurrentPresent;
    }
    if (anyMissing) {
      yield record;
    }
  }
}

let testResults = (await Promise.all(testConfigs(false))).filter((tr) => tr) as TestResult[];
testResults = testResults.sort((a, b) => {
  if (a.configName === b.configName) {
    return 0;
  } else if (a.configName > b.configName) {
    return 1;
  } else {
    return 0;
  }
});

console.table(
  testResults
    .filter((result) => !result || !result.ok)
    .map((result) => {
      if (result) {
        result.url = result.url.substring(0, 200);
      }
      return result;
    })
);

const missingProperties = [...getMissingPropertyNames(configs, propertyNames)];

if (missingProperties.length) {
  console.log("The following properties are not present in all configuration files.");
  console.table(missingProperties);
}

// Update configs with cleaned URLs.
for (const tr of testResults.filter((tr) => tr) as TestResult[]) {
  const config = configs.get(tr.configName) as AppConfig;
  if (config && tr.cleanedUrl) {
    config[tr.propertyName] = tr.cleanedUrl;
  }
}

try {
  // Create the output directory. If it already exists,
  // then nothing will happen.
  const outDir = "newConfigs";
  await mkdir(outDir, {
    recursive: true,
  });

  // Initializing an array of promises for file writes.
  const promises = new Array<Promise<void>>();
  // Write new config files to output directory.
  for (const [name, config] of configs) {
    const json = JSON.stringify(config, undefined, 2);
    const outPath = join(outDir, `${name}.json`);
    const promise = writeFile(outPath, json, {
      encoding: "utf8",
    });
    promises.push(promise);
    promise.then(
      () => console.log(`Created file ${outPath}.`),
      (reason) => console.error(`Failed to create ${outPath}`, reason)
    );
  }
  await Promise.allSettled(promises);
} catch (error) {
  console.error(error);
}
