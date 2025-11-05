/**
 * Takes a string of semicolon-separated tags and returns a Set of strings.
 * If no value is provided, an empty Set is returned.
 */
export const parseTags = (tags?: string): Set<string> =>
	new Set(tags?.split(";").filter((t) => !!t) ?? []);
