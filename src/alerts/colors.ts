/**
 * Alert color: closure
 */
export const closure = [29, 37, 45];
/**
 * Alert color: high
 */
export const high = [179, 11, 0];
/**
 * Alert color: medium
 */
export const medium = [255, 106, 19];
/**
 * Alert color: low
 */
export const low = [255, 193, 7];

/**
 * A mapping of alert values to their integer equivalents.
 */
export const priorities = new Map([
	[1, closure],
	[2, high],
	[3, medium],
	[4, low],
] as const);
