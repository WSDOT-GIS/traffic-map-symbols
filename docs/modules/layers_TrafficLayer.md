[wsdot-travel-center-map](../README.md) / layers/TrafficLayer

# Module: layers/TrafficLayer

## Table of contents

### Variables

- [layerId](layers_TrafficLayer.md#layerid)

### Functions

- [default](layers_TrafficLayer.md#default)
- [initLayer](layers_TrafficLayer.md#initlayer)

## Variables

### layerId

• `Const` **layerId**: ``"traffic-flow-layer"``

#### Defined in

src/layers/TrafficLayer.ts:5

## Functions

### default

▸ **default**(): `undefined` \| `MapImageLayer`

Gets the Traffic MapImageLayer

#### Returns

`undefined` \| `MapImageLayer`

Returns the Traffic layer if it has been initialized, undefined otherwise.

#### Defined in

src/layers/TrafficLayer.ts:42

___

### initLayer

▸ **initLayer**(`url`, `refreshMinute`): [`default`](../classes/types_LayerInfo.default.md)

Initializes the Traffic Layer

**`See`**

 - __esri.MapImageLayerProperties.url
 - __esri.RefreshableLayerProperties.refreshInterval

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` |  |
| `refreshMinute` | `number` | Refresh interval in minutes. |

#### Returns

[`default`](../classes/types_LayerInfo.default.md)

Returns Traffic LayerInfo

#### Defined in

src/layers/TrafficLayer.ts:15
