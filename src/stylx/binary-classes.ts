const mapItems = [
	[1, "GLB"],
	[2, "LegendPatch"],
] as const;

export type BinaryClassId = (typeof mapItems)[number][0];
export type BinaryClass = (typeof mapItems)[number][1];

export const binaryClassMap = new Map(mapItems);

export interface BinarYClassRow {
	ID: number;
	NAME: string;
}
