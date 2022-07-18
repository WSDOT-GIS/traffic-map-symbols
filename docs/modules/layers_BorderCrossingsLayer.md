[wsdot-travel-center-map](../README.md) / layers/BorderCrossingsLayer

# Module: layers/BorderCrossingsLayer

## Table of contents

### Variables

- [layerId](layers_BorderCrossingsLayer.md#layerid)

### Functions

- [default](layers_BorderCrossingsLayer.md#default)
- [initLayer](layers_BorderCrossingsLayer.md#initlayer)

## Variables

### layerId

• `Const` **layerId**: ``"border-crossings-layer"``

#### Defined in

src/layers/BorderCrossingsLayer.ts:42

## Functions

### default

▸ **default**(): `undefined` \| `FeatureLayer`

#### Returns

`undefined` \| `FeatureLayer`

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
