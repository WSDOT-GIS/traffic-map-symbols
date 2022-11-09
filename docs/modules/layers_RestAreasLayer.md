[wsdot-travel-center-map](../README.md) / layers/RestAreasLayer

# Module: layers/RestAreasLayer

## Table of contents

### Variables

- [layerId](layers_RestAreasLayer.md#layerid)

### Functions

- [default](layers_RestAreasLayer.md#default)
- [initLayer](layers_RestAreasLayer.md#initlayer)

## Variables

### layerId

• `Const` **layerId**: ``"rest-areas-layer"``

#### Defined in

src/layers/RestAreasLayer.ts:37

## Functions

### default

▸ **default**(): `undefined` \| `FeatureLayer`

#### Returns

`undefined` \| `FeatureLayer`

#### Defined in

src/layers/RestAreasLayer.ts:63

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

src/layers/RestAreasLayer.ts:46
