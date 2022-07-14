[wsdot-travel-center-map](../README.md) / layers/LineRestrictionsLayer

# Module: layers/LineRestrictionsLayer

## Table of contents

### Variables

- [layerId](layers_LineRestrictionsLayer.md#layerid)

### Functions

- [default](layers_LineRestrictionsLayer.md#default)
- [initLayer](layers_LineRestrictionsLayer.md#initlayer)

## Variables

### layerId

• `Const` **layerId**: ``"line-restrictions-layer"``

#### Defined in

src/layers/LineRestrictionsLayer.ts:67

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
