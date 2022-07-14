[wsdot-travel-center-map](../README.md) / layers/AlertAreaLayer

# Module: layers/AlertAreaLayer

## Table of contents

### Variables

- [layerId](layers_AlertAreaLayer.md#layerid)

### Functions

- [default](layers_AlertAreaLayer.md#default)
- [getFeatureById](layers_AlertAreaLayer.md#getfeaturebyid)
- [getVisibleCenter](layers_AlertAreaLayer.md#getvisiblecenter)
- [initLayer](layers_AlertAreaLayer.md#initlayer)

## Variables

### layerId

• `Const` **layerId**: ``"alert-area-layer"``

#### Defined in

src/layers/AlertAreaLayer.ts:44

## Functions

### default

▸ **default**(): `undefined` \| `FeatureLayer`

#### Returns

`undefined` \| `FeatureLayer`

___

### getFeatureById

▸ **getFeatureById**(`eventId`): `Promise`<`undefined` \| `Graphic`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventId` | `number` |

#### Returns

`Promise`<`undefined` \| `Graphic`\>

___

### getVisibleCenter

▸ **getVisibleCenter**(`eventId`, `visibleExtent`): `Promise`<`undefined` \| `Point`\>

Get the center of the visible part of the alert polygon.
NOTE: Using polygon-clipping package instead of ESRI to reduce the initial file size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventId` | `number` | Event ID |
| `visibleExtent` | `Extent` | Visible Extent |

#### Returns

`Promise`<`undefined` \| `Point`\>

Returns the centroid of the polygon that intersects the feature specified by the eventId.
If there is no feature matching eventId, then undefined is returned.

___

### initLayer

▸ **initLayer**(`features`): [`default`](../classes/types_LayerInfo.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `features` | `Graphic`[] |

#### Returns

[`default`](../classes/types_LayerInfo.default.md)
