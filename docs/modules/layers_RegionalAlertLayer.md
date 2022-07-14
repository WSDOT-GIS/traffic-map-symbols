[wsdot-travel-center-map](../README.md) / layers/RegionalAlertLayer

# Module: layers/RegionalAlertLayer

## Table of contents

### Variables

- [layerId](layers_RegionalAlertLayer.md#layerid)

### Functions

- [centerFeatures](layers_RegionalAlertLayer.md#centerfeatures)
- [default](layers_RegionalAlertLayer.md#default)
- [initLayer](layers_RegionalAlertLayer.md#initlayer)
- [reloadData](layers_RegionalAlertLayer.md#reloaddata)

## Variables

### layerId

• `Const` **layerId**: ``"regional-alert-layer"``

#### Defined in

src/layers/RegionalAlertLayer.ts:92

## Functions

### centerFeatures

▸ **centerFeatures**(`visibleExtent?`): `Promise`<`void`\>

Center the alert icon in the center of the region that is visible.

#### Parameters

| Name | Type |
| :------ | :------ |
| `visibleExtent?` | `Extent` |

#### Returns

`Promise`<`void`\>

___

### default

▸ **default**(): `undefined` \| `FeatureLayer`

#### Returns

`undefined` \| `FeatureLayer`

___

### initLayer

▸ **initLayer**(`alertUrl`, `countyUrl`, `regionUrl`): `Promise`<[`default`](../classes/types_LayerInfo.default.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `alertUrl` | `string` |
| `countyUrl` | `string` |
| `regionUrl` | `string` |

#### Returns

`Promise`<[`default`](../classes/types_LayerInfo.default.md)[]\>

___

### reloadData

▸ **reloadData**(`alertUrl`, `countyUrl`, `regionUrl`): `Promise`<[`default`](../classes/types_LayerInfo.default.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `alertUrl` | `string` |
| `countyUrl` | `string` |
| `regionUrl` | `string` |

#### Returns

`Promise`<[`default`](../classes/types_LayerInfo.default.md)[]\>
