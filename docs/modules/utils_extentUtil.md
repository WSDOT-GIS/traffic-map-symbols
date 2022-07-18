[wsdot-travel-center-map](../README.md) / utils/extentUtil

# Module: utils/extentUtil

## Table of contents

### Functions

- [convert2EsriExtent](utils_extentUtil.md#convert2esriextent)
- [convert2ExtentInfo](utils_extentUtil.md#convert2extentinfo)
- [getEsriExtent](utils_extentUtil.md#getesriextent)
- [getExtentInfo](utils_extentUtil.md#getextentinfo)
- [getOutOfBoundDirection](utils_extentUtil.md#getoutofbounddirection)
- [getOutOfExtentPolygons](utils_extentUtil.md#getoutofextentpolygons)

## Functions

### convert2EsriExtent

▸ **convert2EsriExtent**(`extentInfo`): `Extent`

Converts an ExtentInfo to an Extent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `extentInfo` | [`default`](../interfaces/types_ExtentInfo.default.md) | extent info |

#### Returns

`Extent`

Esri Extent.

___

### convert2ExtentInfo

▸ **convert2ExtentInfo**(`extent`): [`default`](../interfaces/types_ExtentInfo.default.md)

Converts an Extent to an ExtentInfo

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `extent` | `Extent` | An Extent |

#### Returns

[`default`](../interfaces/types_ExtentInfo.default.md)

an ExtentInfo

___

### getEsriExtent

▸ **getEsriExtent**(`name`): `Extent`

Gets an extent by name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name of extent |

#### Returns

`Extent`

an extent.

___

### getExtentInfo

▸ **getExtentInfo**(`id`): [`default`](../interfaces/types_ExtentInfo.default.md)

Gets extent info matching given id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | One of the ids from defaultExtents. |

#### Returns

[`default`](../interfaces/types_ExtentInfo.default.md)

Extent info

___

### getOutOfBoundDirection

▸ **getOutOfBoundDirection**(`mapXY`, `extent?`): ``"ii"`` \| ``"iw"`` \| ``"ie"`` \| ``"ni"`` \| ``"nw"`` \| ``"ne"`` \| ``"si"`` \| ``"sw"`` \| ``"se"``

Figure out the relative direction from the full extent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapXY` | [`default`](../interfaces/types_XY.default.md) | Location to compare against the full extent. |
| `extent?` | [`default`](../interfaces/types_ExtentInfo.default.md) \| `Extent` | An extent. If omitted, "full" extent is assumed. |

#### Returns

``"ii"`` \| ``"iw"`` \| ``"ie"`` \| ``"ni"`` \| ``"nw"`` \| ``"ne"`` \| ``"si"`` \| ``"sw"`` \| ``"se"``

A two character string that matches /[ins][iwe]/
First char: vertical direction = i/n/s (inside/north/south)
Second char: horizontal direction = i/w/e (inside/west/east)

___

### getOutOfExtentPolygons

▸ **getOutOfExtentPolygons**(): `Extent`[]

Get out of extent polygons

#### Returns

`Extent`[]

an array of extents.
