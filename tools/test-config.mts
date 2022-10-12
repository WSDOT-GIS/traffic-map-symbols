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

import { constants } from "node:fs";
import { env } from "node:process";
import { mkdir, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import {
  simplifyUrl,
  compareUrlResults,
  TestResult,
  testUrl,
  IsOnlyOldSucceeded,
  IsOnlyNewSucceeded,
  CompareUrlResultsFailureResult,
  WhichSucceeded,
} from "./url-utils.mjs";
import appConfig from "../public/appconfig.json" assert { type: "json" };
import appConfig_NewService from "../public/appconfig_NewService.json"  assert { type: "json" };
import appConfigPro from "../public/appconfigPro.json" assert { type: "json" };
import appConfigQA from "../public/appconfigQA.json" assert { type: "json" };
import appConfigDev from "../public/appconfigDev.json" assert { type: "json" };

// Need to disable this for testing intranet resources.
env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

type AppConfig = Record<string, string | number> &
  Partial<typeof appConfig & typeof appConfigPro & typeof appConfigQA & typeof appConfigDev>;

const originalConfigs = new Map<string, AppConfig>([
  ["appConfig", appConfig],
  ["appConfigPro", appConfigPro],
  ["appConfigQA", appConfigQA],
  ["appConfigDev", appConfigDev],
  ["appConfig_NewService", appConfig_NewService]
]);

/** Matches a URL with http or https protocol */
const urlRe = /^https?:\/\//i;

/**
 * Gets a set of all the property names defined in the
 * given {@link AppConfig} objects.
 * @param configs
 * @returns
 */
function getAllAppConfigPropertyNames(...configs: AppConfig[]) {
  const output = new Set<string>();
  for (const config of configs) {
    for (const key in config) {
      if (Object.prototype.hasOwnProperty.call(config, key)) {
        output.add(key);
      }
    }
  }
  return output;
}

/**
 * An array of three elements:
 *
 * index   | name      | description
 * -----  :|-----------|:------------
 * `0`     | name      | config property name
 * `1`     | oldConfig | original {@link AppConfig}
 * `2`     | newConfig | new {@link AppConfig}
 */
type ConfigDifferences = [name: string, oldConfig: string, newConfig: string];

/**
 * Compares the properties of two {@link AppConfig}s, yielding the name and
 * values of only the properties that differ.
 * @param oldConfig - old config
 * @param newConfig - new config
 */
function* getDifferentConfigSettings(oldConfig: AppConfig, newConfig: AppConfig) {
  const settingNames = getAllAppConfigPropertyNames(oldConfig, newConfig);

  for (const name of settingNames) {
    const valueA = (oldConfig as Record<string, string>)[name];
    const valueB = (newConfig as Record<string, string>)[name];
    if (valueA !== valueB) {
      yield [name, valueA, valueB] as ConfigDifferences;
    }
  }
}

type MissingPropertyResult = Record<string, string | boolean>;

/**
 * Detects which properties (if any) specified in {@link propertyNames}
 * are not present in {@link configs}.
 * @param configs - A mapping of configs to config names.
 * @param propertyNames - A set of property names.
 * @yields - An object that specifies which properties are missing in the config.
 */
function* getMissingPropertyNames(
  configs: Map<string, AppConfig>,
  propertyNames: Iterable<keyof AppConfig>
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

interface IteratePropertyNonUrlResult {
  propertyName: string;
  propertyValue: unknown;
  isUrl: false;
}

interface IteratePropertyUrlResult {
  propertyName: string;
  propertyValue: string;
  isUrl: true;
}

type IteratePropertyResult = IteratePropertyUrlResult | IteratePropertyNonUrlResult;

/**
 * Iterates through the properties of an app configuration, yielding property
 * name, value, and a bool indicating if the value is a URL.
 * @param appConfig - An application configuration
 * @param skipNonUrls - Set to true to only yield properties that are URLs, ignoring others.
 */
function* iterateProperties(appConfig: AppConfig, skipNonUrls = false) {
  for (const propertyName in appConfig) {
    if (Object.prototype.hasOwnProperty.call(appConfig, propertyName)) {
      const propertyValue = appConfig[propertyName];
      let isUrl = false;
      if (typeof propertyValue === "string" && urlRe.test(propertyValue)) {
        isUrl = true;
      }
      if (!isUrl && skipNonUrls) {
        continue;
      }
      yield { propertyName, propertyValue, isUrl } as IteratePropertyResult;
    }
  }
}

function GetSuccessfulUrl(
  result: CompareUrlResultsFailureResult<string>,
  oldUrl: URL,
  simplifiedUrl: URL
) {
  let url: URL | null = null;
  let whichSucceeded: WhichSucceeded = WhichSucceeded.BOTH_FAILED;
  if (IsOnlyOldSucceeded(result)) {
    url = oldUrl;
    whichSucceeded = WhichSucceeded.OLD_SUCCEEDED;
  } else if (IsOnlyNewSucceeded(result)) {
    url = simplifiedUrl;
    whichSucceeded = WhichSucceeded.NEW_SUCCEEDED;
  }
  return { url, whichSucceeded };
}

interface ConfigProperty {
  configName: string;
  propertyName: keyof AppConfig;
  propertyValue: AppConfig[keyof AppConfig];
}

interface TestUnchangedUrlPropertiesResult extends ConfigProperty {
  testResult: TestResult;
}

interface TestChangedUrlPropertiesResult extends ConfigProperty {
  whichSucceeded: WhichSucceeded;
}

function isChangedUrlPropertyResult(c: ConfigProperty): c is TestChangedUrlPropertiesResult {
  return Object.prototype.hasOwnProperty.call(c, "whichSucceeded");
}

async function testUnchangedUrlProperty(
  propertyValue: string,
  configName: string,
  propertyName: string
) {
  const testResult = await testUrl(propertyValue);
  return {
    configName,
    propertyName,
    propertyValue,
    testResult,
  } as TestUnchangedUrlPropertiesResult;
}

/**
 * For a property in a config that had its URL simplified:
 * 1. Fetch the results of both the old and new URL
 * 2. Determine if the old a/o new URL fetch succeeded.
 *  - If they both succeeded, return the new URL if the
 *    output of both is the same, old URL if they differ.
 *  - If the new URL request fails, return the old URL
 * @param oldUrl - Original URL
 * @param simplifiedUrl - Simplified version of {@link oldUrl }.
 * @param configName - The name of the configuration
 * @param propertyName - The name of the property that the URL came from.
 * @returns
 */
async function testChangedUrlProperty(
  oldUrl: URL,
  simplifiedUrl: URL,
  configName: string,
  propertyName: string
): Promise<TestChangedUrlPropertiesResult> {
  const compareUrlResultsPromise = compareUrlResults(oldUrl, simplifiedUrl);
  compareUrlResultsPromise.then(r => {
    console.group(`Comparison of URLs for ${propertyName} of ${configName}`);
    if (typeof r === "number") {
      const areIdentical = r === 0;
      const msg = `URL's responses are ${areIdentical ? "identical" : "different"}.`;
      if (!areIdentical) {
        console.debug(msg, {
          config: configName,
          property: propertyName,
          "old URL": oldUrl,
          "simplified URL": simplifiedUrl
        });
      } else {
        console.debug(msg);
      }
    } else {
      // const [oldResult, newResult] = r
      r.forEach((result, i) => {
        if (result.status === "rejected") {
          const oldOrNew = i === 0 ? "old" : "new";
          console.debug(`The ${oldOrNew} URL's request failed.`);
        }
      })
    }
    console.groupEnd();
  })
  const result = await compareUrlResultsPromise;
  let url: URL;
  let whichSucceeded: WhichSucceeded = WhichSucceeded.BOTH_FAILED;
  let propertyValue: string;
  if (typeof result === "number") {
    url = result === 0 ? simplifiedUrl : oldUrl;
    whichSucceeded = WhichSucceeded.BOTH_SUCCEEDED;
    propertyValue = (result === 0 ? url : oldUrl).href;
  } else {
    const getUrlResult = GetSuccessfulUrl(result, oldUrl, simplifiedUrl);
    whichSucceeded = getUrlResult.whichSucceeded;
    propertyValue = (getUrlResult.url || oldUrl).href;
  }
  return {
    configName,
    propertyName,
    propertyValue,
    whichSucceeded,
  };
}

/**
 * Result of a test of a configs properties.
 */
interface PropertiesTestResult {
  /** config name */
  name: string,
  /** old config */
  oldConfig: AppConfig,
  /** new config, or null if there were no changes. */
  newConfig: AppConfig | null,
  /** The number of properties that were changed. */
  changedPropertyCount: number;
}

async function testPropertiesOfConfig(config: AppConfig, configName: string) {
  console.group(`${testPropertiesOfConfig.name}: ${configName}`);
  const configPromises = new Array<Promise<ConfigProperty>>();
  const propertiesIterator = iterateProperties(config, false);
  for (const { propertyName, propertyValue, isUrl } of propertiesIterator) {
    if (!isUrl) {
      console.debug(`Property ${propertyName}'s value does not appear to be a URL: ${propertyValue}. Skipping to next property.`);
      continue;
    }

    const oldUrl = new URL(propertyValue);
    const [simplifiedUrl, removedParams] = simplifyUrl(oldUrl);

    if (removedParams) {
      console.debug(`The following parameters have been removed from the ${propertyName} URL:`);
      console.table(removedParams, ["parameter", "reason"]);
      const compareResultPromise = testChangedUrlProperty(
        oldUrl,
        simplifiedUrl,
        configName,
        propertyName
      );
      configPromises.push(compareResultPromise);
    } else {
      const testResultPromise = testUnchangedUrlProperty(propertyValue, configName, propertyName);
      configPromises.push(testResultPromise);
    }
  }

  // Create new object and then assign property values
  // to create a copy of the old config object.
  const newConfig = copyObject(config) as typeof config;

  let changedPropertyCount = 0;

  for await (const configProperty of configPromises) {
    if (isChangedUrlPropertyResult(configProperty) && urlHasChanged(configProperty)) {
      changedPropertyCount++;
      newConfig[configProperty.propertyName] = configProperty.propertyValue;
    }
  }
  console.groupEnd();
  return {
    name: configName,
    oldConfig: config,
    newConfig: changedPropertyCount ? newConfig : null,
    changedPropertyCount: changedPropertyCount
   } as PropertiesTestResult;
}

function copyObject(config: Record<string, unknown>) {
  const newConfig: typeof config = {};
  for (const propName in config) {
    if (Object.prototype.hasOwnProperty.call(config, propName)) {
      const value = config[propName];
      newConfig[propName] = value;
    }
  }
  return newConfig;
}

/**
 * Determines if the URL of a config property has been simplified, and
 * that the simplified URL returned the same results as the original
 * version.
 * @param configProperty - Test result.
 * @returns True if the URL was changed successfully, false otherwise.
 */
function urlHasChanged(configProperty: TestChangedUrlPropertiesResult) {
  return hasBitflagValue(configProperty.whichSucceeded, WhichSucceeded.NEW_SUCCEEDED);
}

/**
 * @see {@link https://www.w3schools.com/js/js_bitwise.asp}
 * @param value
 * @param flag
 * @returns A boolean value indicating if value contains flag.
 * ```typescript
 * return (value & flag) === flag
 * ```
 */
function hasBitflagValue(value: number, flag: number) {
  return (value & flag) === flag;
}

function testPropertiesOfConfigs(configs: Map<string, AppConfig>) {

  const output = new Array<Promise<PropertiesTestResult>>();
  for (const [configName, config] of configs) {
    const testResultsPromise = testPropertiesOfConfig(config, configName);
    output.push(testResultsPromise);
  }

  return output;
}

/**
 * Tests configs and writes updated versions to a new directory.
 * @param outDir - Directory where the modified config files will be written to
 * @param space - Value passed to the {@link JSON.stringify} function's `space` parameter.
 */
async function testConfigsAndWriteChanges(outDir: string, space: number | string | undefined = 4) {

  const changedConfigsMap = testPropertiesOfConfigs(originalConfigs);

  for await (const configResult of changedConfigsMap) {
    
    console.log(`${configResult.changedPropertyCount} propert${configResult.changedPropertyCount === 1 ? "y" : "ies"} have changed in ${configResult.name}:`);

    if (!configResult.newConfig) {
      continue;
    }
    
    const filename = `${configResult.name}.json`
    const filePath = join(outDir, filename);
    console.log(`Writing updated config to ${filePath}.`);

    const jsonText = JSON.stringify(configResult.newConfig, undefined, space);

    try {
      writeFile(filePath, jsonText, {
        encoding: "utf-8",
      });
    } catch (error) {
      console.error(`Unable to write config data to ${filePath}`, error);
    }
  }
}

const outDir = "newConfigs";

try {
  await access(outDir, constants.O_DIRECTORY)
} catch (error) {
  console.log(`Could not access ${outDir}. Creating as new directory.`);
  mkdir(outDir, {
    recursive: true,
    mode: constants.O_CREAT
  });
}


testConfigsAndWriteChanges(outDir, 4);