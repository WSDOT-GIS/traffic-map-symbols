export type SymbolFormats = "web2d" | "cim";
export type CimRefUrl = `./resources/styles/cim/${string}.json`;
export type ThumbnailRefUrl = `./resources/styles/thumbnails/${string}.png`;

export interface StyleItem {
  name: string;
  title: string;
  itemType: string;
  dimensionality: string;
  category: string;
  tags: ["rgb", "pink"];
  formats: SymbolFormats[];
  cimRef: CimRefUrl;
  thumbnail: {
    href: string;
  };
}

export interface StyleData {
  items: StyleItem[];
}
