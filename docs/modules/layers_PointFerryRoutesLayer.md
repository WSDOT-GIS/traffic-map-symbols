[wsdot-travel-center-map](../README.md) / layers/PointFerryRoutesLayer

# Module: layers/PointFerryRoutesLayer

## Table of contents

### Variables

- [layerId](layers_PointFerryRoutesLayer.md#layerid)

### Functions

- [default](layers_PointFerryRoutesLayer.md#default)
- [initLayer](layers_PointFerryRoutesLayer.md#initlayer)

## Variables

### layerId

• `Const` **layerId**: ``"ferry-routes-points-layer"``

#### Defined in

src/layers/PointFerryRoutesLayer.ts:62

## Functions

### default

▸ **default**(): `undefined` \| `FeatureLayer`

Gets the feature layer

#### Returns

`undefined` \| `FeatureLayer`

Returns the feature layer if ready, or undefined otherwise.

___

### initLayer

▸ **initLayer**(`url`): [`default`](../classes/types_LayerInfo.default.md)

Initializes the layer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | Layer URL |

#### Returns

[`default`](../classes/types_LayerInfo.default.md)

Layer info object
