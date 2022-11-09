[wsdot-travel-center-map](../README.md) / layers/PointRestrictionsLayer

# Module: layers/PointRestrictionsLayer

## Table of contents

### Variables

- [layerId](layers_PointRestrictionsLayer.md#layerid)

### Functions

- [default](layers_PointRestrictionsLayer.md#default)
- [initLayer](layers_PointRestrictionsLayer.md#initlayer)

## Variables

### layerId

• `Const` **layerId**: ``"point-restrictions-layer"``

#### Defined in

src/layers/PointRestrictionsLayer.ts:67

## Functions

### default

▸ **default**(): `undefined` \| `FeatureLayer`

#### Returns

`undefined` \| `FeatureLayer`

#### Defined in

src/layers/PointRestrictionsLayer.ts:100

___

### initLayer

▸ **initLayer**(`jsonUrl`): `Promise`<[`default`](../classes/types_LayerInfo.default.md)\>

Initialize a layer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonUrl` | `string` | JSON URL |

#### Returns

`Promise`<[`default`](../classes/types_LayerInfo.default.md)\>

Promise<LayerInfo>

#### Defined in

src/layers/PointRestrictionsLayer.ts:76
