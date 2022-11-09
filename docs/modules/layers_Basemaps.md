[wsdot-travel-center-map](../README.md) / layers/Basemaps

# Module: layers/Basemaps

## Table of contents

### Functions

- [getBasemapInfo](layers_Basemaps.md#getbasemapinfo)
- [getDefaultBasemapInfo](layers_Basemaps.md#getdefaultbasemapinfo)
- [initBasemap](layers_Basemaps.md#initbasemap)
- [toggleBasemapInfo](layers_Basemaps.md#togglebasemapinfo)
- [validateBasemapName](layers_Basemaps.md#validatebasemapname)

## Functions

### getBasemapInfo

▸ **getBasemapInfo**(`name`): [`default`](../interfaces/types_BasemapInfo.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`default`](../interfaces/types_BasemapInfo.default.md)

#### Defined in

src/layers/Basemaps.ts:45

___

### getDefaultBasemapInfo

▸ **getDefaultBasemapInfo**(): [`default`](../interfaces/types_BasemapInfo.default.md)

#### Returns

[`default`](../interfaces/types_BasemapInfo.default.md)

#### Defined in

src/layers/Basemaps.ts:9

___

### initBasemap

▸ **initBasemap**(`basemapUrl`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `basemapUrl` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

src/layers/Basemaps.ts:15

___

### toggleBasemapInfo

▸ **toggleBasemapInfo**(`currentName`): [`default`](../interfaces/types_BasemapInfo.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentName` | `string` |

#### Returns

[`default`](../interfaces/types_BasemapInfo.default.md)

#### Defined in

src/layers/Basemaps.ts:58

___

### validateBasemapName

▸ **validateBasemapName**(`name`): `boolean`

Make sure the base map name is valid...

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

src/layers/Basemaps.ts:79
