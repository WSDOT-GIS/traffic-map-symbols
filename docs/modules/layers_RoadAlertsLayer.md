[wsdot-travel-center-map](../README.md) / layers/RoadAlertsLayer

# Module: layers/RoadAlertsLayer

## Table of contents

### Variables

- [layerId](layers_RoadAlertsLayer.md#layerid)

### Functions

- [default](layers_RoadAlertsLayer.md#default)
- [initLayer](layers_RoadAlertsLayer.md#initlayer)

## Variables

### layerId

• `Const` **layerId**: ``"road-alerts-layer"``

#### Defined in

src/layers/RoadAlertsLayer.ts:79

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

LayerInfo
