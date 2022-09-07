export const defaultParamValues = new Map([
  ["returnIdsOnly", "false"],
  ["returnCountOnly", "false"],
  ["returnExtentOnly", "false"],
  ["returnZ", "false"],
  ["returnM", "false"],
  ["returnCentroid", "false"],
  ["returnTrueCurves", "false"],
  ["timeReferenceUnknownClient", "false"],
  ["returnGeometry", "true"],
]);

export const enum WhichSucceeded {
  BOTH_FAILED = 0,
  OLD_SUCCEEDED = 1,
  NEW_SUCCEEDED = 2,
  BOTH_SUCCEEDED = OLD_SUCCEEDED | NEW_SUCCEEDED,
}

interface ParamDependency {
  condition: string;
  dependentParams: string[];
}

// TODO: additional URL simplification checks.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dependentUpon: Record<string, ParamDependency> = {
  geometry: {
    condition: "not null",
    dependentParams: ["geometryType", "spatialRel"],
  },
};

/**
 * Creates a "cleaned-up" version of the input URL by removing
 * unnecessary search parameters.
 * @param url - A URL
 * @returns An array of two elements.
 * * If no unnecessary parameters were detected, both elements will be null.
 * * Otherwise, the elements will be the simplified URL and a Map of removed
 *   parameters and their values, respectively.
 */
export function simplifyUrl(url: URL) {
  const unneededIfNoGeometry = ["geometryType", "spatialRel"];

  // Set url to a URL object if it is a string. Leave it alone if it's
  // already a URL.
  url = url instanceof URL ? url : new URL(url);
  // Create a new Map to hold names of search parameters that seem to
  // be unneeded in the URL.
  /**
   * A mapping of the reason a parameter has been determined to be unneeded keyed to the parameter name.
   */
  const unneeded = new Map<string, string>();
  // Detect if a "geometry" parameter is present.
  const geometryParamHasValue = !!url.searchParams.get("geometry");

  // Loop through the search parameters and check to see if they
  // really need to be in the URL.
  // Add each unneeded to the Map.
  for (const [key, value] of url.searchParams) {
    let reason: string | null = null;
    if (!value) {
      // If the parameter is set to an empty string.
      reason = `${key} is set to empty string`;
    } else if (value === defaultParamValues.get(key)) {
      // Parameter doesn't need to be in the URL if it is set to the default value.
      reason = `${key} is set to default value, ${JSON.stringify(value)}`;
    } else if (!geometryParamHasValue && key in unneededIfNoGeometry) {
      // This parameter doesn't do anything if there is no "geometry" parameter.
      reason = `Parameter ${key} is ignored if "geometry" parameter is not set.`;
    }
    if (reason) {
      unneeded.set(key, reason);
    }
  }

  /**
   * Simplified URL. Will be null if no unneeded parameters were detected.
   */
  let newUrl: URL | null = null;

  // Exit if there were no unnecessary parameters found.
  if (unneeded.size < 1) {
    return [null, null] as [null, null];
  }
  // Create a copy of original URL.
  newUrl = new URL(url);

  // Loop through the Map and remove unneeded search parameters from the URL.
  for (const [key,] of unneeded) {
    newUrl.searchParams.delete(key);
  }
  console.groupEnd();

  return [newUrl, unneeded] as [URL, Map<string, string>];
}

type OnlyOldSucceeded<T> = [PromiseFulfilledResult<T>, PromiseRejectedResult];

type OnlyNewSucceeded<T> = [PromiseRejectedResult, PromiseFulfilledResult<T>];

type BothFailed = [PromiseRejectedResult, PromiseRejectedResult];

export type CompareUrlResultsFailureResult<T> =
  | OnlyOldSucceeded<T>
  | OnlyNewSucceeded<T>
  | BothFailed;

export function IsOnlyOldSucceeded<T>(
  result: CompareUrlResultsFailureResult<T>
): result is OnlyOldSucceeded<T> {
  const [oldResult] = result;
  return oldResult.status === "fulfilled";
}

export function IsOnlyNewSucceeded<T>(
  result: CompareUrlResultsFailureResult<T>
): result is OnlyNewSucceeded<T> {
  const [, newResult] = result;
  return newResult.status === "fulfilled";
}

export function IsBothFailed<T>(result: CompareUrlResultsFailureResult<T>): result is BothFailed {
  return !IsOnlyNewSucceeded(result) && !IsOnlyNewSucceeded(result);
}

/**
 * Calls fetch on each URL, calls text() on the response, and
 * then compares the two result strings.
 * @param a - A URL
 * @param b - Another URL
 * @returns If both URL's corresponding fetch operations are
 * successful, returns an integer between -1 and 1. 0 means
 * that both strings are identical.
 * Otherwise, an array of two {@link PromiseSettledResult}
 * objects is returned.
 * @see {@link Promise.allSettled}
 * @example
 * ```typescript
 * const a = new URL("https://example.com/a");
 * const b = new URL("https://example.com/b");
 * const results = await compareUrlResults(a, b);
 * let areIdentical = results === 0;
 * ```
 */
export async function compareUrlResults(a: URL, b: URL) {
  const promises = [a, b].map((url) => fetch(url).then((r) => r.text())) as [
    Promise<string>,
    Promise<string>
  ];
  const [resultA, resultB] = await Promise.allSettled(promises);
  if (resultA.status === "fulfilled" && resultB.status === "fulfilled") {
    const [sa, sb] = [resultA, resultB].map((r) => r.value);
    return sa > sb ? 1 : sa < sb ? -1 : 0;
  } else {
    return [resultA, resultB] as CompareUrlResultsFailureResult<string>;
  }
}

/**
 * Detects if the URL ends in "MapServer", and if it does,
 * adds "f=json" search parameter. This is because some map
 * services have their directory browsing disabled.
 * If it is not a MapServer URL, the original URL is returned.
 * @param url - A URL.
 * @returns A URL.
 */
function ensureMapServiceUrlHasFParamIfNeeded(url: string | URL) {
  const mapServiceUrlRe = /\/MapServer\/?$/i;
  const inputUrl = url instanceof URL ? url : new URL(url);
  const match = inputUrl.pathname.match(mapServiceUrlRe);
  if (!match) {
    return inputUrl;
  }
  inputUrl.searchParams.set("f", "json");
  return inputUrl;
}

export interface TestResult {
  ok: boolean;
  status: number | null;
  statusText: string | null;
  errorName: string | null;
  errorMessage: string | null;
  causeName: string | null;
  causeMessage: string | null;
  url: URL;
}

export interface TestSuccessResult extends TestResult {
  ok: boolean;
  status: number;
  statusText: string;
  errorName: null;
  errorMessage: null;
  causeName: null;
  causeMessage: null;
  url: URL;
}

export interface TestFailResult extends TestResult {
  ok: false;
  status: null;
  statusText: null;
  errorName: string;
  errorMessage: string;
  causeName: string | null;
  causeMessage: string | null;
  url: URL;
}

// export type TestResult = TestSuccessResult | TestFailResult;

export function isTestSuccessResult(testResult: TestResult): testResult is TestSuccessResult {
  return testResult.status !== null;
}

export function isTestFailResult(testResult: TestResult): testResult is TestFailResult {
  return testResult.status === null;
}

/**
 * Tests a URL to see if it is valid be using HEAD request, and if that fails
 * a GET request.
 * @param url - A URL
 * @returns A {@link TestResult} indicating if the URL is valid.
 */
export async function testUrl(url: string | URL): Promise<TestResult> {
  url = ensureMapServiceUrlHasFParamIfNeeded(url);

  let errorName: TestResult["errorName"] = null;
  let errorMessage: TestResult["errorMessage"] = null;
  let causeName: TestResult["causeName"] = null;
  let causeMessage: TestResult["causeMessage"] = null;
  let ok: TestResult["ok"];
  let status: TestResult["status"] = null;
  let statusText: TestResult["statusText"] = null;

  try {
    // Attempt a "HEAD" request on the URL. "HEAD" just asks the server
    // if it can process the request without actually sending the
    // request body. Not all servers / endpoints support "HEAD" requests,
    // though, so it very possible it might fail and the failure needs
    // to be handled.
    let result = await fetch(url, {
      method: "HEAD",
    });
    // If "HEAD" request is not supported, status 405, "Method Not Allowed", is returned.
    // In this case, do a regular "GET" request.
    if (result.status === 405) {
      result = await fetch(url, { method: "GET" });
    }
    // Set variables for result properties upon success.
    // const { ok, status, statusText } = result;
    ok = result.ok;
    status = result.status;
    statusText = result.statusText;
  } catch (error) {
    ok = false;
    // Catch the error and return info about the failure.

    // Rethrow the "error" if it is not actually an Error object,
    // which is not expected.
    if (!(error instanceof Error)) {
      throw error;
    }
    errorName = error.name;
    errorMessage = error.message;
    // Capture name and message of the error's cause if present.
    if (error.cause) {
      if (error.cause instanceof Error) {
        causeName = error.cause.name;
        causeMessage = error.cause.message;
      }
    }
  }

  // Return error info.
  return {
    ok,
    status,
    statusText,
    errorName,
    errorMessage,
    causeName,
    causeMessage,
    url,
  };
}
