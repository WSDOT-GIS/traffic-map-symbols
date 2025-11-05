/**
 * | ID | Name                     |
 * |---:|:-------------------------|
 * |  1 | Color                    |
 * |  2 | Color Scheme             |
 * |  3 | Point Symbol             |
 * |  4 | Line Symbol              |
 * |  5 | Polygon Symbol           |
 * |  6 | Text Symbol              |
 * |  7 | North Arrow              |
 * |  8 | Scale Bar                |
 * |  9 | Standard Label Placement |
 * | 10 | Maplex Label Placement   |
 * | 11 | Grid                     |
 * | 12 | Mesh Symbol              |
 * | 13 | Legend                   |
 * | 14 | Table Frame              |
 * | 15 | Map Surround             |
 * | 17 | Legend Item              |
 * | 18 | Table Frame Field        |
 * | 19 | Area Legend Patch        |
 * | 20 | Line Legend Patch        |
 */
const classMapContent = [
	[1, "Color"],
	[2, "Color Scheme"],
	[3, "Point Symbol"],
	[4, "Line Symbol"],
	[5, "Polygon Symbol"],
	[6, "Text Symbol"],
	[7, "North Arrow"],
	[8, "Scale Bar"],
	[9, "Standard Label Placement"],
	[10, "Maplex Label Placement"],
	[11, "Grid"],
	[12, "Mesh Symbol"],
	[13, "Legend"],
	[14, "Table Frame"],
	[15, "Map Surround"],
	[17, "Legend Item"],
	[18, "Table Frame Field"],
	[19, "Area Legend Patch"],
	[20, "Line Legend Patch"],
] as const;

/**
 * | ID | Name                     |
 * |---:|:-------------------------|
 * |  1 | Color                    |
 * |  2 | Color Scheme             |
 * |  3 | Point Symbol             |
 * |  4 | Line Symbol              |
 * |  5 | Polygon Symbol           |
 * |  6 | Text Symbol              |
 * |  7 | North Arrow              |
 * |  8 | Scale Bar                |
 * |  9 | Standard Label Placement |
 * | 10 | Maplex Label Placement   |
 * | 11 | Grid                     |
 * | 12 | Mesh Symbol              |
 * | 13 | Legend                   |
 * | 14 | Table Frame              |
 * | 15 | Map Surround             |
 * | 17 | Legend Item              |
 * | 18 | Table Frame Field        |
 * | 19 | Area Legend Patch        |
 * | 20 | Line Legend Patch        |
 */
export const classMap = new Map(classMapContent);

export type ClassName = (typeof classMapContent)[number][1];

export interface ClassRow {
	ID: number;
	NAME: string;
}
