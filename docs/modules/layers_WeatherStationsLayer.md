[wsdot-travel-center-map](../README.md) / layers/WeatherStationsLayer

# Module: layers/WeatherStationsLayer

## Table of contents

### Variables

- [layerId](layers_WeatherStationsLayer.md#layerid)

### Functions

- [default](layers_WeatherStationsLayer.md#default)
- [initLayer](layers_WeatherStationsLayer.md#initlayer)

## Variables

### layerId

• `Const` **layerId**: ``"weather-stations-layer"``

#### Defined in

src/layers/WeatherStationsLayer.ts:80

## Functions

### default

▸ **default**(): `undefined` \| `FeatureLayer`

#### Returns

`undefined` \| `FeatureLayer`

#### Defined in

src/layers/WeatherStationsLayer.ts:124

___

### initLayer

▸ **initLayer**(`jsonUrl`, `view`): `Promise`<[`default`](../classes/types_LayerInfo.default.md)\>

Initialize feature layer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonUrl` | `string` | JSON URL |
| `view` | `MapView` | MapView |

#### Returns

`Promise`<[`default`](../classes/types_LayerInfo.default.md)\>

LayerInfo

#### Defined in

src/layers/WeatherStationsLayer.ts:90
