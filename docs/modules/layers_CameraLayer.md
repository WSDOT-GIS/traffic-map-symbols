[wsdot-travel-center-map](../README.md) / layers/CameraLayer

# Module: layers/CameraLayer

## Table of contents

### Variables

- [layerId](layers_CameraLayer.md#layerid)

### Functions

- [default](layers_CameraLayer.md#default)
- [initLayer](layers_CameraLayer.md#initlayer)
- [setCluster](layers_CameraLayer.md#setcluster)
- [toggleCluster](layers_CameraLayer.md#togglecluster)

## Variables

### layerId

• `Const` **layerId**: ``"traffic-camera-layer"``

#### Defined in

src/layers/CameraLayer.ts:71

## Functions

### default

▸ **default**(): `undefined` \| `FeatureLayer`

#### Returns

`undefined` \| `FeatureLayer`

#### Defined in

src/layers/CameraLayer.ts:98

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

src/layers/CameraLayer.ts:80

___

### setCluster

▸ **setCluster**(`scale`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scale` | `number` |

#### Returns

`void`

#### Defined in

src/layers/CameraLayer.ts:125

___

### toggleCluster

▸ **toggleCluster**(`newScale`, `oldScale`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newScale` | `number` |
| `oldScale` | `number` |

#### Returns

`void`

#### Defined in

src/layers/CameraLayer.ts:112
